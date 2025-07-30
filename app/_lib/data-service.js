import { supabase } from "./supabase";

export const getBathtubs = async function () {
  const { data, error } = await supabase
    .from("bathtubs")
    .select("id,name,regularPrice,discount,lengths,image,priceId")
    .order("name");
  if (error) {
    console.error(error);
    throw new Error("Bathtubs could not be loaded");
  }
  return data;
};

export async function getBathtub(id) {
  const { data, error } = await supabase
    .from("bathtubs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Bathtub could not be loaded");
  }
  return data;
}

export async function getProductImages(id) {
  const { data, error } = await supabase
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

export async function getBathtubLengths() {
  const { data, error } = await supabase.from("bathtublengths").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bathtub lengths could not be loaded");
  }
  return data;
}

export async function getLength(length) {
  let query = supabase.from("bathtubs").select("*");
  if (isFinite(length)) {
    query = query.eq("lengths", length);
  } else query = query.in("lengths", length);

  const { data, error } = await query;
  // const { data, error } = await supabase
  //   .from("bathtubs")
  //   .select("*")
  //   .in("lengths", length);

  if (error) {
    console.error(error);
    throw new Error("Bathtub could not be filter");
  }
  return data;
}

// export async function getBathtubWidths() {
//   let query = supabase.from("bathtubwidths").select("*");
//   if (isFinite(width)) {
//     query = query.eq("width", width);
//   } else query = query.in("width", width);

//   const { data, error } = await query;
//   // const { data, error } = await supabase
//   //   .from("bathtubs")
//   //   .select("*")
//   //   .in("lengths", length);

//   if (error) {
//     console.error(error);
//     throw new Error("Bathtub width could not be filter");
//   }
//   return data;
// }

export async function getBathtubWidths() {
  const { data, error } = await supabase.from("bathtubwidths").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bathtub widths could not be loaded");
  }
  return data;
}

export async function getBathtubHeights() {
  const { data, error } = await supabase.from("bathtubheights").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bathtub heights could not be loaded");
  }
  return data;
}

export async function getBathtubMaterial() {
  const { data, error } = await supabase.from("bathtubmaterial").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bathtub materials could not be loaded");
  }
  return data;
}
