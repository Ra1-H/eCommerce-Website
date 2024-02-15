import React from "react";
import CategoryFilter from "./CategoryFilter";
import SearchFilter from "./SearchFilter";
import LikeButton from "./LikeButton";

function FiltersBar() {
  return (
    <div className="flex gap-4 justify-between px-6 py-4 pt-0 w-full">
      <CategoryFilter />
      <SearchFilter />
      <LikeButton />
    </div>
  );
}

export default FiltersBar;
