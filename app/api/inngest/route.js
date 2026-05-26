import { Resend } from "resend";

import { serve } from "inngest/next";
import { inngest } from "@/app/_lib/inngest";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = inngest.createFunction(
  { id: "send-order-email", triggers: [{ event: "order/created" }] },
  async ({ event, step }) => {
    const { email, orderId, total, items } = event.data;

    // Correct way inside Inngest function
    await step.run("send-email", async () => {
      return await resend.emails.send({
        from: "TubVilla <sales@tubvilla.com>",
        to: email,
        subject: `Order Confirmation #${orderId}`,

        html: `
    <div style="
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 40px 20px;
    ">
      <div style="
        max-width: 650px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e5e5e5;
      ">

        <!-- Header -->
        <div style="
          padding: 40px 30px 20px;
          text-align: center;
        ">
          <h1 style="
            margin: 0;
            font-size: 30px;
            color: #111111;
          ">
            Thank you for your order 🛁
          </h1>

          <p style="
            margin-top: 18px;
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
          ">
            We’ve received your order and are preparing it for shipment.
          </p>
        </div>

        <!-- Order Info -->
        <div style="
          margin: 0 30px;
          background-color: #fafafa;
          border: 1px solid #eeeeee;
          border-radius: 10px;
          padding: 22px;
        ">
          <p style="
            margin: 0 0 12px;
            font-size: 15px;
            color: #333333;
          ">
            <strong>Order Number:</strong> #${orderId}
          </p>

          <p style="
            margin: 0;
            font-size: 15px;
            color: #333333;
          ">
            <strong>Total:</strong> $${(total / 100).toFixed(2)}
          </p>
        </div>

        <!-- Items -->
        <div style="
          padding: 30px;
        ">
          <h2 style="
            margin: 0 0 20px;
            font-size: 20px;
            color: #111111;
          ">
            Order Summary
          </h2>

          ${items
            .map(
              (item) => `
                <div style="
                  display: flex;
                  gap: 16px;
                  padding: 18px 0;
                  border-top: 1px solid #eeeeee;
                  align-items: center;
                ">

                  <img
                    src="${item.image}"
                    alt="${item.name}"
                    width="90"
                    height="90"
                    style="
                      border-radius: 10px;
                      object-fit: cover;
                      border: 1px solid #eeeeee;
                      flex-shrink: 0;
                    "
                  />

                  <div style="flex: 1;">
                    <p style="
                      margin: 0;
                      font-size: 15px;
                      font-weight: bold;
                      color: #111111;
                    ">
                      ${item.name}
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      font-size: 14px;
                      color: #666666;
                    ">
                      Quantity: ${item.quantity}
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      font-size: 14px;
                      color: #111111;
                    ">
                      $${item.unit_price}
                    </p>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>

        <!-- CTA -->
        <div style="
          padding: 0 30px 40px;
          text-align: center;
        ">
          <a
            href="https://tubvilla.com/account/orders"
            style="
              display: inline-block;
              padding: 14px 28px;
              background-color: #111111;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 15px;
              font-weight: bold;
            "
          >
            View Your Order
          </a>

          <p style="
            margin-top: 30px;
            font-size: 14px;
            color: #888888;
            line-height: 1.6;
          ">
            Questions about your order? Simply reply to this email and our team will help you.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          padding: 20px;
          background-color: #fafafa;
          border-top: 1px solid #eeeeee;
          text-align: center;
        ">
          <p style="
            margin: 0;
            font-size: 12px;
            color: #999999;
          ">
            © 2026 TubVilla. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  `,
      });
    });
  },
);

const sendShippingEmail = inngest.createFunction(
  { id: "send-shipping-email", triggers: [{ event: "order/shipped" }] }, // This matches the event we will trigger
  async ({ event, step }) => {
    const { orderId, trackingNumber, carrier, items } = event.data;

    // Fetch the customer email from the orders table
    const orderData = await step.run("get-customer-email", async () => {
      const { data, error } = await supabaseAdmin
        .from("orders")
        .select("customer_email")
        .eq("order_id", orderId)
        .single();
      // console.log(data);

      // console.log(email);
      if (error || !data?.customer_email) {
        throw new Error("Could not find order email");
      }
      return { email: data.customer_email };
    });

    // Send the shipping email
    await step.run("send-resend-email", async () => {
      return await resend.emails.send({
        from: "TubVilla <sales@tubvilla.com>",
        to: orderData.email,
        subject: `Your order #${orderId} has shipped!`,

        html: `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px 20px;">

    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">

      <!-- HEADER -->
      <div style="padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 30px; color: #111111;">
          Your order is on the way 🚚
        </h1>

        <p style="margin-top: 18px; font-size: 16px; line-height: 1.6; color: #555555;">
          Great news! Your TubVilla order has shipped and is now on its way to you.
        </p>
      </div>

      <!-- TRACKING BOX -->
      <div style="margin: 0 30px; background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 10px; padding: 22px;">
        <p style="margin: 0 0 12px; font-size: 15px; color: #333333;">
          <strong>Order Number:</strong> #${orderId}
        </p>

        <p style="margin: 0 0 12px; font-size: 15px; color: #333333;">
          <strong>Carrier:</strong> ${carrier}
        </p>

        <p style="margin: 0; font-size: 15px; color: #333333;">
          <strong>Tracking Number:</strong> ${trackingNumber}
        </p>
      </div>

      <!-- ITEMS SECTION -->
      <div style="padding: 30px;">

        <h2 style="margin: 0 0 20px; font-size: 18px; color: #111111;">
          Items in your shipment
        </h2>

        ${items
          .map(
            (item) => `
              <table role="presentation" width="100%" style="border-top:1px solid #eeeeee; padding:16px 0;">
                <tr>

                  <td width="90" style="vertical-align: top;">
                    <img
                      src="${item.image}"
                      width="80"
                      height="80"
                      style="border-radius:8px; object-fit:cover; border:1px solid #eeeeee;"
                    />
                  </td>

                  <td style="padding-left:12px; vertical-align: top;">
                    <p style="margin:0; font-weight:bold; font-size:15px; color:#111111;">
                      ${item.name}
                    </p>

                    <p style="margin:6px 0 0; color:#666666; font-size:14px;">
                      Qty: ${item.quantity}
                    </p>
                  </td>

                </tr>
              </table>
            `,
          )
          .join("")}

      </div>

      <!-- CTA -->
      <div style="padding: 0 30px 40px; text-align: center;">

        <a
          href="https://tubvilla.com/account/orders"
          style="
            display: inline-block;
            padding: 14px 28px;
            background-color: #111111;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
          "
        >
          View Your Order
        </a>

        <p style="margin-top: 30px; font-size: 14px; color: #888888; line-height: 1.6;">
          Questions about your shipment? Simply reply to this email and our team will help you.
        </p>

      </div>

      <!-- FOOTER -->
      <div style="padding: 20px; background-color: #fafafa; border-top: 1px solid #eeeeee; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #999999;">
          © 2026 TubVilla. All rights reserved.
        </p>
      </div>

    </div>
  </div>
`,
      });
    });
  },
);

export const abandonedCheckout = inngest.createFunction(
  { id: "abandoned-checkout", triggers: [{ event: "checkout/started" }] },
  async ({ event, step }) => {
    const { stripeSessionId } = event.data;
    await step.sleep("wait-for-abandonment", "15m");

    const { data, error } = await supabaseAdmin
      .from("checkout_sessions")
      .select("*")
      .eq("stripe_session_id", stripeSessionId)
      .single();

    if (error || !data) {
      throw new Error("Checkout session not found");
    }

    if (data.status !== "completed") {
      await step.run("send-resend-email", async () => {
        return await resend.emails.send({
          from: "TubVilla <sales@tubvilla.com>",
          to: data.email,
          subject: "You left something behind 🛁",
          html: `
  <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
      
      <div style="padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 30px; color: #111111;">
          Your cart is waiting 🛁
        </h1>

        <p style="margin-top: 18px; font-size: 16px; line-height: 1.6; color: #555555;">
          Looks like you left something behind at TubVilla.
          Your selected items are still available, but they may not stay in stock for long.
        </p>

        <a 
          href="https://www.tubvilla.com"
          style="
            display: inline-block;
            margin-top: 28px;
            padding: 14px 28px;
            background-color: #111111;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
          "
        >
          Return to Your Cart
        </a>

        <p style="margin-top: 35px; font-size: 14px; color: #888888;">
          Need help choosing the perfect bathtub or fixture?
          Simply reply to this email — we’re happy to help.
        </p>
      </div>

      <div style="padding: 20px; background-color: #fafafa; border-top: 1px solid #eeeeee; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #999999;">
          © 2026 TubVilla. All rights reserved.
        </p>
      </div>

    </div>
  </div>
`,
        });
      });
    }
  },
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendOrderEmail, sendShippingEmail, abandonedCheckout],
});
