import { Resend } from "resend";

import { serve } from "inngest/next";
import { inngest } from "@/app/_lib/inngest";
import { supabase } from "@/app/_lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = inngest.createFunction(
  { id: "send-order-email", triggers: [{ event: "order/created" }] },
  async ({ event, step }) => {
    const { email, orderId, total } = event.data;

    // Correct way inside Inngest function
    await step.run("send-email", async () => {
      return await resend.emails.send({
        from: "no-reply@tubvilla.com", // Use this if your domain isn't verified
        to: email,
        subject: "Order Confirmation",
        html: `<h1>Order ${orderId}</h1><p>Total: ${total}</p>`,
      });
    });
  },
);

const sendShippingEmail = inngest.createFunction(
  { id: "send-shipping-email", triggers: [{ event: "order/shipped" }] }, // This matches the event we will trigger
  async ({ event, step }) => {
    const { orderId, trackingNumber, carrier } = event.data;

    // Fetch the customer email from the orders table
    const orderData = await step.run("get-customer-email", async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("customer_email")
        .eq("order_id", orderId)
        .single();
      // console.log(data);
      const email = data.customer_email;
      // console.log(email);
      if (error || !data?.customer_email) {
        throw new Error("Could not find order email");
      }
      return { email: data.customer_email };
    });

    // Send the shipping email
    await step.run("send-resend-email", async () => {
      return await resend.emails.send({
        from: "no-reply@tubvilla.com",
        to: orderData.email,
        subject: `Your order #${orderId} has shipped!`,
        html: `
          <h1>Great news!</h1>
          <p>Your order is on the way.</p>
          <p><strong>Carrier:</strong> ${carrier}</p>
          <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
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

    const { data, error } = await supabase
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
          from: "no-reply@tubvilla.com",
          to: data.email,
          subject: `You left something behind 🛁!`,
          html: `<p>You left items in your cart.....</p>`,
        });
      });
    }
  },
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendOrderEmail, sendShippingEmail, abandonedCheckout],
});
