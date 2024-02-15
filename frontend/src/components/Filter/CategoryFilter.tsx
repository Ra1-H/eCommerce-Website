import React from "react";
import { useCommerceStore } from "../../store";

function CategoryFilter() {
  const { categoryFilter, setCategoryFilter } = useCommerceStore();

  const categories = [
    //keep the empty string for matching all values filter
    "",
    "clothes",
    "furniture",
    "arts",
    "vases",
    "paintings",
  ];
  return (
    <div className="categories flex gap-4 items-center">
      {categories.map((category) => {
        if (!category) {
          return (
            <p
              key={category}
              onClick={() => {
                setCategoryFilter(category);
              }}
              className={`font-bold text-xl cursor-pointer ${
                categoryFilter === category && "active"
              }`}
            >
              All
            </p>
          );
        }
        return (
          <div
            key={category}
            onClick={() => {
              setCategoryFilter(category);
            }}
            className="h-10"
          >
            <img
              key={category}
              className={`cursor-pointer h-full min-w-7 ${
                categoryFilter === category && "active-img"
              }`}
              src={"/categories/" + category + ".png"}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
