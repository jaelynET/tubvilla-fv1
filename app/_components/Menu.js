"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

import Overlay from "./Overlay";

function Menu() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="">
      <Bars3Icon
        width={25}
        height={24}
        onClick={() => setMenu((show) => !show)}
        className="cursor-pointer"
      />
      {menu && (
        <div
          className={`fixed top-0 left-0 h-full w-full md:w-106 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-11 ${
            menu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end mt-3 mx-3">
            <button
              onClick={() => setMenu((show) => !show)}
              className="cursor-pointer self-end  "
            >
              <XMarkIcon className="h-5 w-5 " />
            </button>
          </div>
          <div className="mt-10 pl-10">
            <Link
              href="/bathtubs"
              className="pl-10 my-20 mb-3 text-grey-0 cursor-pointer md:relative "
            >
              Tubs
            </Link>
            <div className="md:border-b-2 md:border-solid md:border-main md:absolute md:top-0"></div>
            <ul className="pl-18 mt-2">
              <li className="mb-2 text-grey-0 cursor-pointer hover:text-main-800 ">
                Freestanding
              </li>
              <li className="mb-2 text-grey-0 cursor-pointer hover:text-main-800">
                Acrylic
              </li>
              <li className="mb-2 text-grey-0 cursor-pointer hover:text-main-800">
                Copper
              </li>
              <li className="mb-2 text-grey-0 cursor-pointer hover:text-main-800">
                Drop-in
              </li>
              <li className="mb-2 text-grey-0 cursor-pointer hover:text-main-800">
                Japanese
              </li>
            </ul>
          </div>
        </div>
      )}
      {menu && <Overlay isOpen={menu} />}
    </div>
  );
}

export default Menu;
