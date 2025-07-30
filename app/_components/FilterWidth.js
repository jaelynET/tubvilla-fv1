"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function FilterWidth({ widths, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-3">
        <p>width</p>
        <div
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsOpen((show) => !show)}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      {isOpen &&
        widths.map((width) => (
          <div key={width.id}>
            <button className="bg-pink-300">
              <input
                type="checkbox"
                disabled
                // onClick={() => handleFilter("width", width.width)}
              />
            </button>

            {width.width}
          </div>
        ))}
    </div>
  );
}

export default FilterWidth;
