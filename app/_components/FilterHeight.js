"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function FilterHeight({ heights, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-3">
        <p>height</p>
        <div
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsOpen((show) => !show)}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      {isOpen &&
        heights.map((height) => (
          <div key={height.id}>
            <button className="bg-pink-300">
              <input
                type="checkbox"
                disabled
                // onClick={() => handleFilter("height", height.height)}
              />
            </button>

            {height.height}
          </div>
        ))}
    </div>
  );
}

export default FilterHeight;
