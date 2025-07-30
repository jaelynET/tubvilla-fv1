import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { buffer } from "micro"; // npm i micro

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28",
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const rawBody = await buffer(req);
  const signature = req.headers["stripe-signature"];

  let event = Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe Webhook Error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: session.id,
        email: session.customer_email,
        amount_total: session.amount_total,
        status: session.payment_status,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return res.status(500).send("Order insert failed");
    }

    // Fetch line items from Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });

    //             // 3. Upsert products into Supabase
    // const c = lineItems.data.map((item => {
    //         const product = item.price?.product;

    //       if (product) {
    //         const { error: productError } = await supabase
    //           .from("products")
    //           .upsert({
    //             stripe_product_id: product.id,
    //             name: product.name,
    //             image_url: product.images?.[0] || null,
    //           }, { onConflict: 'stripe_product_id' });

    //         if (productError) {
    //           console.error("Product upsert error:", productError);
    //           // Optionally continue even if one product fails
    //         }
    //       }
    // }))

    // for (const item of lineItems.data) {
    //   const product = item.price?.product as Stripe.Product;

    //   if (product) {
    //     const { error: productError } = await supabase
    //       .from("products")
    //       .upsert({
    //         stripe_product_id: product.id,
    //         name: product.name,
    //         image_url: product.images?.[0] || null,
    //       }, { onConflict: 'stripe_product_id' });

    //     if (productError) {
    //       console.error("Product upsert error:", productError);
    //       // Optionally continue even if one product fails
    //     }
    //   }
    // }

    const itemsToInsert = lineItems.data.map((item) => ({
      order_id: order.id,
      product_id: item.price?.product,
      description: item.description,
      quantity: item.quantity,
      unit_amount: item.price?.unit_amount ?? 0,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
      return res.status(500).send("Failed to insert order items");
    }

    return res.status(200).json({ success: true });
  }

  res.status(200).json({ received: true });
}
