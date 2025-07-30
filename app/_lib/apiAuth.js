import { supabase } from "./supabase";

import { createClient } from "../utils/supabase/server";

export async function signup(userInfo) {
  const supabase = await createClient();
  const { fullName, email, password } = userInfo;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  return userInfo;
}

export async function login(loginInfo) {
  console.log(loginInfo);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(loginInfo);

  return { data, error };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function createUser(userInfo) {
  const { data, error } = await supabase.from("users").insert([userInfo]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
