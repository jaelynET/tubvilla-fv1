import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { inngest } from "@/app/_lib/inngest";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const runtime = "nodejs";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Stripe signature error:", err.message);
      return new NextResponse("Invalid signature", { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object;

    const userId = session.metadata?.user_id;
    const cart = JSON.parse(session.metadata?.cart || "[]");

    if (!session?.id) {
      return new NextResponse("No session", { status: 400 });
    }

    // Prevent duplicates
    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("order_id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ received: true });
    }
    // Retrieve session object to get/expand shipping details
    const checkOutSession = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );

    const shipping =
      checkOutSession.shipping_details?.address ||
      checkOutSession.customer_details?.address ||
      null;
    const billing = checkOutSession.customer_details?.address;

    // Insert order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        userId,
        stripe_session_id: session.id,
        total_amount: session.amount_total,
        currency: session.currency,
        products: cart,
        status: "paid",
        shipping_address: shipping,
        billing_address: billing,
      })
      .select()
      .single();

    // if (orderError) {
    //   console.error("Order insert error:", orderError);
    //   return new NextResponse("DB error", { status: 500 });
    // }
    if (orderError) {
      console.error("ORDER INSERT ERROR:", JSON.stringify(orderError, null, 2));

      return NextResponse.json({ error: orderError }, { status: 500 });
    }

    // Insert order items
    const itemsToInsert = cart.map((item) => ({
      order_id: order.order_id,
      product_id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit_price: item.regularPrice,
      image: item.image,
      shipment_group: "standard",
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(itemsToInsert);

    // if (itemsError) {
    //   console.error("Order items error:", itemsError);
    //   return new NextResponse("DB error", { status: 500 });
    // }
    if (itemsError) {
      console.error("ITEMS INSERT ERROR:", JSON.stringify(itemsError, null, 2));

      return NextResponse.json({ error: itemsError }, { status: 500 });
    }

    // Update checkout session record
    await supabaseAdmin
      .from("checkout_sessions")
      .update({ status: "completed" })
      .eq("stripe_session_id", session.id);

    //  inngest send ...
    try {
      await inngest.send({
        name: "order/created",
        data: {
          email: session.customer_details.email,
          orderId: order.order_id,
          total: session.amount_total,
        },
      });
    } catch (err) {
      console.error("Inngest send failed:", err);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook fatal error:", err);
    return new NextResponse("Webhook failed", { status: 500 });
  }
}
