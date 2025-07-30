"use client";

import { redirect } from "next/dist/server/api-utils";
//import { googleSignin } from "../_lib/actions";
import { createClient } from "../utils/supabase/client";
import { createUser, getUser } from "../_lib/authClient";

function GoogleButton() {
  async function handleGoogleSignin() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Error during sign-in:", error.message);
    } else {
      console.log(data);
      console.log("Redirecting to:", data.url);
      window.location.href = data.url;
    }
  }
  return (
    // <form onSubmit={handleGoogleSignin}>
    <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium ">
      <span>Signin with Google</span>
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
    </button>
    //</form>
  );
}

export default GoogleButton;
