import Navigation from "./Navigation";
import Logo from "./Logo";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
//import { createClient } from "../utils/supabase/client";
import { createClient } from "../utils/supabase/server";
import { useCart } from "./CartContext";
import ShoppingCart from "./ShoppingCart";
import Menu from "./Menu";
// import { useEffect } from "react";
// import { supabase } from "../_lib/supabase";

export default async function Header() {
  // const session = await auth();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // const { full_name: fullName } = data.user.user_metadata;
  // console.log(fullName);
  // console.log(data);
  //  bg-white border-b border-gray-100;
  return (
    <header className="">
      <div className="flex justify-between pt-7  mb-4 ">
        <Menu />
        <Logo />

        <ShoppingCart />

        {/* <div className="aboslute rounded-full bg-red-500" /> */}
        {/* <Navigation /> */}
        {/* <div className="flex gap-2 relative ">
          <MagnifyingGlassIcon className="h-5 w-5 text-black" />
          {data?.user ? (
            <div className="group">
              <Link href="/account" className="flex gap-4 cursor-pointer ">
                {/* <Image
                  className="h-9 w-9 rounded-full border-accent-300 "
                  src={data.user}
                  alt={data.user}
                  referrerPolicy="no-referrer"
                  width="8"
                  height="8"
                /> 
                <p>Account</p>
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <Link href="/login" className=" cursor-pointer">
              <span className="text-grey-0">Login</span>
            </Link>
          )}
          {/* <UserIcon className="h-5 w-5" /> 
          <ShoppingCartIcon className="h-5 w-5 hover:text-my-orange2 cursor-pointer transition-colors" />
        </div> */}
      </div>
    </header>
  );
}
