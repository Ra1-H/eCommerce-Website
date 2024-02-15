import React, { useState } from "react";

function ProductCarousel({ pictures }: { pictures: any[] }) {
  const [index, setIndex] = useState(0);

  const moveLeft = () => {
    if (0 === index) {
      setIndex(pictures.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  const moveRight = () => {
    if (pictures.length - 1 === index) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {pictures[index] && (
        <div className="h-[80%] w-full relative flex justify-center items-end">
          <img
            className="object-cover h-[100%] w-[80%]"
            src={`http://localhost:3001/${pictures[index]}`}
            alt=""
          />
          <p
            onClick={moveLeft}
            className="absolute text-2xl cursor-pointer left-0 top-[50%]"
          >
            {"<"}
          </p>
          <p
            onClick={moveRight}
            className="absolute text-2xl cursor-pointer right-0 top-[50%]"
          >
            {">"}
          </p>
        </div>
      )}
    </>
  );
}

export default ProductCarousel;
