"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function FilterMaterial({ materials, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-3">
        <p>material</p>
        <div
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsOpen((show) => !show)}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      {isOpen &&
        materials.map((material) => (
          <div key={material.id}>
            <button className="bg-pink-300">
              <input
                type="checkbox"
                disabled
                // onClick={() => handleFilter("material", material.material)}
              />
            </button>

            {material.material}
          </div>
        ))}
    </div>
  );
}

export default FilterMaterial;
