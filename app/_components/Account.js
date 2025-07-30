/*

"use client";

import { useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

function Account() {
  useEffect(function () {
    const supabase = createClient();
    const { data, error } = supabase.auth.getUser();
  }, []);
return (

  <div className="flex gap-2 relative ">
    {data?.user ? (
      <div className="group">
        <Link href="/account" className="flex gap-4 cursor-pointer ">
          {<Image
                    className="h-9 w-9 rounded-full border-accent-300 "
                    src={data.user}
                    alt={data.user}
                    referrerPolicy="no-referrer"
                    width="8"
                    height="8"
                  /> }
          <p>Account</p>
        </Link>
        <SignOutButton />
      </div>
    ) : (
      <Link href="/login" className=" cursor-pointer">
        <span>Login</span>
      </Link>
    )}
  </div>
);
}

export default Account;
*/
