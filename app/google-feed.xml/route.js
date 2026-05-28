import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function GET() {
  // 1. CHANGED .maybeSingle() to .select() to get an array
  const { data: variants, error } = await supabase
    .from("product_variants")
    .select(
      `
      *,
      products (
        name,
        description,
        slug,
        brand
      ),
      inventory!left (
        quantity
      )
    `,
    );

  if (error) {
    return new Response("Feed error", {
      status: 500,
    });
  }

  console.log("variants count", variants?.length);
  console.log(
    variants?.slice(0, 3).map((v) => ({
      id: v.manufacturer_part_number,
      inventory: v.inventory,
    })),
  );

  const items = variants
    ?.filter((variant) => {
      // 1. GET THE FIRST INVENTORY OBJECT FROM THE ARRAY
      const inv = Array.isArray(variant.inventory)
        ? variant.inventory[0]
        : variant.inventory;
      return inv?.quantity > 0;
    })
    .map((variant) => {
      const product = variant.products;

      const titleParts = [
        product?.name,
        variant.colorFinish,
        variant.nominal_size,
      ].filter(Boolean);

      const title = titleParts.join(" - ");

      // 2. GET THE FIRST INVENTORY OBJECT HERE AS WELL
      const inv = Array.isArray(variant.inventory)
        ? variant.inventory[0]
        : variant.inventory;
      const quantity = inv?.quantity || 0;
      const availability = quantity > 0 ? "in stock" : "out of stock";

      return `
        <item>
          <g:id>${variant.manufacturer_part_number}</g:id>
          <g:item_group_id>${variant.productId}</g:item_group_id>
          <title><![CDATA[${title}]]></title>
          <description><![CDATA[${product?.description || ""}]]></description>
          <link>https://tubvilla.com{product?.slug}</link>
          <g:image_link>${variant.image}</g:image_link>
          <g:availability>${availability}</g:availability>
          <g:condition>new</g:condition>
          <g:price>${variant.regularPrice} USD</g:price>
          <g:brand>${product?.brand || "TubVilla"}</g:brand>
          ${variant.upc ? `<g:gtin>${variant.upc}</g:gtin>` : ""}
          ${variant.colorFinish ? `<g:color>${variant.colorFinish}</g:color>` : ""}
          ${variant.nominal_size ? `<g:size>${variant.nominal_size}</g:size>` : ""}
          <g:mpn>${variant.manufacturer_part_number}</g:mpn>
        </item>
      `;
    })
    .join("");

  console.log("items:", items);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
      <channel>
        <title>TubVilla</title>
        <link>https://tubvilla.com</link>
        <description>Google Shopping Feed</description>
        ${items}
      </channel>
    </rss>
  `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
