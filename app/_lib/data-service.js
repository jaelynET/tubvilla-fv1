import { applySort } from "../filters/config/sortby";
import { supabaseAdmin } from "../utils/supabase/supabaseAdmin";
// import { supabase } from "./supabase";

export const getBathtubs = async function () {
  const { data, count, error } = await supabaseAdmin
    .from("products")
    .select("*");
  // .select("id,name,image");

  if (error) {
    console.error(error);
    throw new Error("Bathtubs could not be loaded");
  }
  return data;
};

export async function getBathtub(slug) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `*,  product_variants(
        *,
        inventory(
          quantity,
          in_stock,
          discontinued
        )
      )`,
    )
    .eq("slug", slug)
    .order("overall_length", {
      referencedTable: "product_variants",
      ascending: true,
    })
    .single();
  if (error) {
    console.error(error);
    throw new Error("Bathtub could not be loaded");
  }
  return data;
}

export async function showSimilarProducts(slug) {
  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id,product_categories(categoryId,categories(id,name,slug))")
    .eq("slug", slug)
    .maybeSingle();
  if (productError || !product) {
    return { retrieveStyle: [], similarProducts: [] };
  }

  const categoryIds =
    product?.product_categories?.map((cat) => cat.categoryId) || [];
  const retrieveStyle =
    product?.product_categories?.map((cat) => cat.categories?.name || "") || [];

  if (!categoryIds.length) {
    return { retrieveStyle, similarProducts: [] };
  }

  const { data: similar, error: similarError } = await supabaseAdmin
    .from("product_categories")
    .select(
      `products(
        id,
        name,
        image,
        category,
        slug,
        modelName,
        status,
          product_variants (
        regularPrice
      )
        
      )
  `,
    )
    .in("categoryId", categoryIds)
    .limit(8);

  if (similarError) {
    console.error(similarError);
    throw new Error("Similar products could not be loaded");
  }
  let similarProducts = similar
    .map((s) => s.products)
    .filter(Boolean) // Safety check in case of orphaned category links
    .filter((p) => p.status !== "discontinued")
    .filter(
      (v, i, a) =>
        v.modelName && a.findIndex((t) => t.modelName === v.modelName) === i,
    );
  if (similarProducts.length === 0) {
    const { data: fallbackCategory } = await supabaseAdmin

      .from("categories")
      .select("id")
      .eq("slug", "freestanding")
      .single();

    const { data: fallback } = await supabaseAdmin
      .from("product_categories")
      .select(
        `
        products(
          id,
          name,
          image,
          category,
          slug,
          modelName,
          status,
          product_variants(regularPrice)
        )
      `,
      )
      .eq("categoryId", fallbackCategory.id)
      .limit(8);

    similarProducts = fallback
      .map((s) => s.products)
      .filter(Boolean)
      .filter((p) => p.status !== "discontinued")
      .filter(
        (v, i, a) =>
          v.modelName && a.findIndex((t) => t.modelName === v.modelName) === i,
      );
  }

  // 5. Format output safely
  similarProducts = similarProducts.map((p) => {
    const basePrice = p.product_variants?.[0]?.regularPrice || 0;

    return {
      ...p,
      regularPrice: basePrice,
    };
  });

  return {
    retrieveStyle,
    similarProducts,
  };
}

// export async function compatibleProducts(productId) {
//   const { data, error } = await supabaseAdmin
//     .from("product_compatibility")
//     // change bathtubs! to products! 2fk's link to same table
//     .select("compatibleId,products!compatibleId(*)")
//     .eq("productId", productId);

//   if (error) {
//     console.error(error);
//     throw new Error("Compatible products could not be loaded");
//   }

//   return data;
// }
export async function compatibleFaucets() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(`*, product_variants(*)`)
    .eq("product_type", "faucet")
    .limit(5);
  if (error) {
    console.error(error);
    throw new Error("Bathtub could not be loaded");
  }
  return data;
}

export async function getProductImages(id) {
  const { data, error } = await supabaseAdmin
    .from("productImages")
    .select("id,image,position")
    .eq("productId", id)
    .order("position");

  if (error) {
    console.error(error);
    throw new Error("Bathtub pictures could not be loaded");
  }
  return data;
}

export async function getOrders(id) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*,order_items(*)")
    .eq("userId", id);
  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  return data;
}

export async function getOrder(orderNumber) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber);
  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  return data;
}

export async function userReview(userReview) {
  const { error } = await supabaseAdmin.from("reviews").insert([userReview]);
  if (error) {
    console.error(error);
    throw new Error("Reviews could not be INSERTED");
  }
}

export async function getReviews(id) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id,reviews(*)")
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function popularTubs() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id, 
      name, 
   image,
   slug,
      averageRating,
      product_variants!inner(regularPrice)
    `,
    )
    .gte("averageRating", 4)
    .gte("reviewCount", 3)
    .limit(8); // Added a limit to keep the "Popular" section snappy

  if (error) {
    console.error(error);
    throw new Error("Popular tubs could not be loaded");
  }

  // Flatten the response so your component doesn't need to change
  return data.map((product) => {
    const regularPrice = product.product_variants?.[0]?.regularPrice;

    return {
      ...product,
      regularPrice,
      // formattedPrice: forma(regularPrice);
      // formattedPrice: new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      //   maximumFractionDigits: 0,
      // }).format(regularPrice / 100),
    };
  });
}

// export async function popularTubs() {
//   const { data, error } = await supabaseAdmin
//     .from("products")
//     .select("id,name,regularPrice,discount,image,averageRating")
//     .gte("averageRating", 4)
//     .gte("reviewCount", 3);
//   // .limit(7);
//   // .eq("id", id);
//   if (error) {
//     console.error(error);
//     throw new Error("Tubs could not be loaded");
//   }

//   // console.dir(data, { depth: null });
//   return data;
// }

export async function underXTubs() {
  const dollarsToCents = (amount) => amount * 100;
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id, 
      name, 
      image,
      slug,
      product_type,
      product_variants!inner(regularPrice)
    `,
    )
    // Filter applied to the related table column
    .eq("product_type", "bathtub")
    .lt("product_variants.regularPrice", dollarsToCents(1000))
    .limit(8);

  if (error) {
    console.error(error);
    throw new Error("Under X Tubs could not be loaded");
  }

  // Flatten the result so 'regularPrice' is top-level for your UI
  return data.map((product) => {
    const regularPrice = product.product_variants?.[0]?.regularPrice;

    return {
      ...product,
      regularPrice,
    };
  });
}

export async function limitedDeals() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id, 
      name, 
      image,
      product_variants!inner(regularPrice)
    `,
    )
    .gte("averageRating", 4)
    .gte("reviewCount", 3)
    .limit(7);

  if (error) {
    console.error(error);
    throw new Error("Tubs could not be loaded");
  }

  // Flattening the data (optional)
  // Since regularprice is now in an array (product_variants: [{regularprice: 100}]),
  // you might want to map it so your frontend doesn't break:
  return data.map((product) => ({
    ...product,
    regularPrice: product.product_variants[0]?.regularPrice,
    image: product.image || product.product_variants[0]?.image || null,
  }));
}

export async function getCategories() {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id,name,product_type,slug");

  // .limit(7);
  // .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Tubs could not be loaded");
  }

  // console.dir(data, { depth: null });
  return data;
}

export async function getProductType(subcategory) {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("product_type")
    .eq("slug", subcategory);

  if (error) {
    console.error(error);
    throw new Error("Product type could not be loaded");
  }

  return data;
}

export async function getB(productType, filters, page = 1, limit = 12) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin
    .from("products")
    .select(
      `
      *,
     product_variants(
        *,
        inventory(
          quantity,
          in_stock,
          discontinued
        )
      ),
      product_categories!inner(
        categories!inner(
          id,
          name,
          slug,
          product_type
        )
      )
    `,
      { count: "exact" },
    )
    .eq("product_categories.categories.product_type", productType);

  if (filters.slug) {
    query = query.eq("product_categories.categories.slug", filters.slug);
  }

  // DIMENSIONS
  if (filters.length?.min) query = query.gte("lengths", filters.length.min);

  if (filters.length?.max) query = query.lte("lengths", filters.length.max);

  if (filters.width?.min) query = query.gte("width", filters.width.min);

  if (filters.width?.max) query = query.lte("width", filters.width.max);

  if (filters.height?.min) query = query.gte("height", filters.height.min);

  if (filters.height?.max) query = query.lte("height", filters.height.max);

  // PRICE RANGE
  if (filters.price?.min) query = query.gte("regularPrice", filters.price.min);

  if (filters.price?.max) query = query.lte("regularPrice", filters.price.max);
  // CAPACITY
  if (filters.capacity?.min)
    query = query.gte("waterCapacity", filters.capacity.min);

  if (filters.capacity?.max)
    query = query.lte("waterCapacity", filters.capacity.max);

  if (filters.color?.length) {
    query = query.in("colorFinish", filters.color);
  }

  if (filters.drain?.length) {
    query = query.in("drainPlacement", filters.drain);
  }

  if (filters.sort) {
    query = applySort(query, filters.sort);
  } else {
    query = query.order("reviewCount", { ascending: false, nullsFirst: false });
  }

  // PAGINATION
  query = query.range(from, to);

  const { data, count, error } = await query;
  // console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Products cant be loaded");
  }
  return { data, count };
}
