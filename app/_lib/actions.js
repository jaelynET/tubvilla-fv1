"use server";

import { redirect } from "next/navigation";

import { getUser, login, logout, signup } from "./apiAuth";
// import { signIn, signOut } from "./auth";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";
import { supabase } from "./supabase";

export async function signupAction(data) {
  console.log(data);

  const userSignin = await signup(data);
  if (!userSignin) {
    throw new Error("Something went wrong. Please try again");
  }

  const createUser = await createUser({
    email: data.email,
  });

  redirect("/");
}

export async function googleSignin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(data);
  if (data) {
    redirect("/");
  }
}

export async function signInUser(formData) {
  const userEmail = formData.get("email");
  console.log(userEmail);

  // 1.) Validate field
  const emailSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address. Please try again!" }),
  });

  const validateField = emailSchema.safeParse({ email: userEmail });

  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors.email,
    };
  }
  //2.) check if user exist
  const user = await getUser(userEmail);
  //console.log(user);
  if (!user) {
    return { message: "Email provided does not exist" };
  } else {
    return { user: user.email };
  }
}

export async function loginAction(credentialsEmail, formData) {
  const callbackUrl = formData.get("callbackUrl")?.toString() || "/";

  const data = {
    email: credentialsEmail.email,
    password: formData.get("password"),
  };
  const user = await login(data);
  //console.log(user);

  if (!user) {
    return { message: "Wrong password try again. Or create new password" };
  }
  redirect(callbackUrl);
}

export async function logoutAction() {
  await logout();
  redirect("/");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

//export async function handleCheckout({ product }) {
//   const res = await fetch("/api/checkout_sessions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   });
//   const { sessionId } = await res.json();
//   const stripe = await loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//   );
//   await stripe.redirectToCheckout({ sessionId });
// }

//   await signIn("credentials", credentials, { redirect: "/" });
// }

// export async function signInPassword(credentials) {
//   await signIn("credentials", credentials, { redirect: "/" });
// }

// export default async function createUser(formData: FormData) {

//   // Return early if the form data is invalid
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // Mutate data
// }
