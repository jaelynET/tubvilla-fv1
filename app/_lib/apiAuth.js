import { createClient } from "../utils/supabase/server";
import { headers } from "next/headers";

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
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(loginInfo);

  return { data, error };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
}

export async function getUser(email) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .ilike("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function forgotPassword(email) {
  const supabase = await createClient();
  const origin = await headers().get("origin");

  if (!origin) {
    return { error: { message: "Missing request origin" } };
  }
  // const origin = await headers().get("origin");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?next=/reset-password`,
  });
  return { error };
}

export async function updatePassword(newPassword) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { error };
}

export async function updateEmail(newEmail) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: newEmail,
  });
  return { error };
}
