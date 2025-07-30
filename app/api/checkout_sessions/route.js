import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/_lib/stripe";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(req, res) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const formData = await req.formData();
  const cart = JSON.parse(formData.get("cart"));

  const lineItems = cart.map((item) => ({
    price: item.priceId.trim(),
    quantity: item.quantity,
  }));
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });
    console.log(session.url);
    if (!user) {
      const url = new URL("/login", req.url);

      url.searchParams.set("rdirect", session.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
