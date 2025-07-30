"use client";
import { FireIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function SoldPopup() {
  const [showState, setShowState] = useState(false);
  useEffect(function () {
    setTimeout(() => {
      setShowState(true);
    }, 3000);
  }, []);
  return (
    <div
      className={`transition-all duration-700 ease-out transform  ${
        showState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {showState ? (
        <div className="flex gap-1 bg-orange-200 w-20 px-1 rounded-xs justify-center ">
          {/* <FireIcon height={24} width={24} className="text-accent-50" /> */}
          <span className="text-[16px] font-bold uppercase tracking-normal ">
            24 sold
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SoldPopup;
