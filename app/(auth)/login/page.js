import { use } from "react";
import EmailForm from "../../_components/EmailForm";
import GoogleButton from "../../_components/GoogleButton";
import OneTap from "../../_components/OneTap";
// import { supabase } from "@/app/_lib/supabase";

import CreateAccount from "../../_components/SignupForm";
//import { createClient } from "@/app/utils/supabase/client";
import Head from "next/head";

export const metadata = {
  title: "Login",
};

function Page() {
  return (
    <>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <div>
          <EmailForm />
        </div>

        <p>or</p>

        <GoogleButton />
        {/* <OneTap /> */}
      </div>
      {/* <div className="flex flex-col gap-6 mt-4 items-center">
        <CreateAccount />
      </div> */}
    </>
  );
}
export default Page;

//https://yofjxcueoomwfiiimisf.supabase.co/auth/v1/callback
