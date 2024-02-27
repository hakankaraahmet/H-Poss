import React from "react";
import { categories } from "../../constants/categories";

const Categories = () => {
  return (
    <ul className="flex md:flex-col gap-4  text-lg">
      {categories.map((category) => (
        <li
          key={category.id}
          className="bg-gradient-to-r select-none text-center from-green-300 via-green-400 to-green-500 px-6 py-10 text-white w-full rounded-2xl hover:cursor-pointer hover:from-green-700 hover:to-green-900 min-w-[150px]"
        >
          <span>{category.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
