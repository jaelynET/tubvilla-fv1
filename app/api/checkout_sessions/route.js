import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // ---------------------------------------------------
    // 1. Create Supabase server client
    // ---------------------------------------------------
    const supabase = await createClient();

    // ---------------------------------------------------
    // 2. Check logged-in user
    // ---------------------------------------------------
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        redirectTo: "/login?next=/checkout-resume",
      });
    }

    const customerEmail = user.email;
    const userId = user.id;

    // ---------------------------------------------------
    // 3. Read cart from frontend
    // Expected shape:
    // [
    //   {
    //     id: 92,
    //     name: "...",
    //     image: "...",
    //     quantity: 1,
    //     regularPrice: 86900,
    //     size: "51 x 28",
    //     finish: "white"
    //   }
    // ]
    // ---------------------------------------------------
    const { cart } = await req.json();

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ---------------------------------------------------
    // 4. Build Stripe line items directly from cart
    // regularPrice already in cents
    // ---------------------------------------------------
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} (${item.size} / ${item.finish})`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.regularPrice,
      },
      quantity: item.quantity,
    }));

    if (!line_items.length) {
      return NextResponse.json(
        { error: "No checkout items found" },
        { status: 400 },
      );
    }

    // ---------------------------------------------------
    // 5. Get site origin
    // ---------------------------------------------------
    const headersList = await headers();
    const origin = headersList.get("origin");

    // ---------------------------------------------------
    // 6. Create Stripe checkout session
    // ---------------------------------------------------
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      customer_email: customerEmail,
      metadata: {
        user_id: userId,
        cart: JSON.stringify(
          cart.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            regularPrice: item.regularPrice,
            quantity: item.quantity,
          })),
        ),
      },
    });

    // ---------------------------------------------------
    // 7. Optional: store session in DB
    // ---------------------------------------------------
    await supabase.from("checkout_sessions").insert({
      stripe_session_id: session.id,
      email: customerEmail,
      status: "pending",
    });

    try {
      await inngest.send({
        name: "checkout/started",
        data: {
          stripeSessionId: session.id,
          email: customerEmail,
          userId,
        },
      });
    } catch (err) {
      console.error("Inngest send failed:", err);
    }

    // ---------------------------------------------------
    // 8. Return Stripe URL to frontend
    // ---------------------------------------------------
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout route error:", error);

    return NextResponse.json(
      {
        error: "Checkout failed",
      },
      { status: 500 },
    );
  }
}
