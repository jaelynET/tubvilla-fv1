"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function FilterLength({ lengths, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-3">
        <p>length</p>
        <div
          className="h-5 w-5 cursor-pointer "
          onClick={() => setIsOpen((show) => !show)}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      {isOpen &&
        lengths.map((length) => (
          <div key={length.id}>
            <button className="bg-pink-300">
              <input
                type="checkbox"
                disabled
                // onClick={() => handleFilter("length", length.length)}
              />
            </button>

            {length.length}
          </div>
        ))}
    </div>
  );
}
export default FilterLength;
