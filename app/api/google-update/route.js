import { google } from "googleapis";
import { supabase } from "@/app/_lib/supabase";

export async function POST() {
  // 1. Fetch variants from Supabase with corrected casing
  const { data: variants, error } = await supabase.from("product_variants")
    .select(`
      manufacturer_part_number,
      regularPrice,
      inventory!left (quantity)
    `);

  if (error) return new Response("Database error", { status: 500 });

  try {
    // 2. Parse credentials and repair any corrupt newline strings from Next.js env
    const credentialsInfo = JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
    );
    const formattedPrivateKey = credentialsInfo.private_key.replace(
      /\\n/g,
      "\n",
    );

    // 3. Use standard GoogleAuth class with an explicit credentials block
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: credentialsInfo.project_id,
        private_key_id: credentialsInfo.private_key_id,
        private_key: formattedPrivateKey,
        client_email: credentialsInfo.client_email,
        client_id: credentialsInfo.client_id,
      },
      scopes: ["https://www.googleapis.com/auth/content"], // Exact Content API scope
    });

    // 4. Safely extract the verified token client
    const authClient = await auth.getClient();

    // 5. Inject the authClient directly into Content API instance
    const shoppingcontent = google.content({
      version: "v2.1",
      auth: authClient,
    });

    const merchant_id = process.env.GOOGLE_MERCHANT_ID;

    // 6. Map variants into parallel execution promises
    const updatePromises = (variants || []).map(async (variant) => {
      const inv = Array.isArray(variant.inventory)
        ? variant.inventory
        : variant.inventory;
      const quantity = inv?.quantity || 0;
      const availability = quantity > 0 ? "in stock" : "out of stock";
      const googleProductId = `online:en:US:${variant.manufacturer_part_number}`;

      return shoppingcontent.products.update({
        merchantId: merchant_id,
        productId: googleProductId,
        updateMask: "price,availability", // Triggers partial updates correctly under the hood
        requestBody: {
          availability: availability,
          price: {
            value: variant.regularPrice.toString(),
            currency: "USD",
          },
        },
      });
    });

    // 7. Fire all updates simultaneously to stay well under Next.js server limits
    const results = await Promise.all(updatePromises);

    return new Response(
      JSON.stringify({ success: true, updated: results.length }),
      { headers: { "content-type": "application/json" } },
    );
  } catch (apiError) {
    console.error("CRITICAL GOOGLE API ERROR DETAILS:", {
      message: apiError.message,
      code: apiError.code,
      errors: apiError.errors,
    });

    return new Response(
      JSON.stringify({
        error: "Google API sync failed",
        details: apiError.message,
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
