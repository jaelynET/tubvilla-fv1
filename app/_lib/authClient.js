import { createClient } from "../utils/supabase/client";

export async function getUser(email) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}


export async function createUser(userInfo) {
  const supabase = createClient();

  const { data, error } = await supabase.from("users").insert([userInfo]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

//For Client

// const existingUser = await getUser(data.user.email);
// if (!existingUser) {
//   await createUser({
//     email: data.user.email,
//     fullName: data.user.user_metadata.name,
//   });
// }
