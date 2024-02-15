import React, { useEffect, useState } from "react";
import { useCommerceStore } from "../../store";
import axios from "axios";
import ProductCarousel from "./ProductCarousel";
import Rating from "./Rating";
import { BsHeartFill } from 'react-icons/bs';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  store: string; // store is the storeID
  pictures: string[];
}

function ProductCard({ product }: { product: Product }) {
  const { token, favorites, addOneToCart, setFavorites } = useCommerceStore();

  const [storeName, setStoreName] = useState<string | null>(null);
  const [storeLogo, setStoreLogo] = useState<string | null>(null);

  const getRating = (product: any) => {
    if (!product.numberOfReviews) {
      return false;
    }
    return product.sumOfRatings / product.numberOfReviews;
  };


  const fetchStoreDetails=async(storeId: string)=>{
    try {
      const response=await axios.get(`http://localhost:3001/api/v1/stores/${storeId}`);
      setStoreName(response.data.name);
      setStoreLogo(response.data.logo);
    } catch (error) {
      console.error("Error fetching store details for logo and name:", error);
    }
  }

  useEffect(()=>{
    fetchStoreDetails(product.store)
  },[])


  return (
    <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
      <div className="top h-[60%] relative">
        <ProductCarousel pictures={product.pictures} />
        <div className="absolute top-2 left-2 leading-none text-sm">
        <div className="flex gap-2 items-center">
            {storeLogo && (
              <img
                className="object-cover h-8 w-8 rounded-full"
                src={`http://localhost:3001/${storeLogo}`}
                alt="Store Logo"
              />
            )}
            {storeName}
          </div>
        </div>
        <span className="flex absolute bottom-2 justify-between w-full px-2 items-center">
          <Rating
            currentRating={getRating(product) || 0}
            setCurrentRating={() => {}}
            // @ts-ignore
            numberOfReviews={product.numberOfReviews}
          />
          <BsHeartFill
            className={
              "BsHeart-main " + (favorites.includes(product._id) && "active")
            }
          />
        </span>
      </div>
      <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
        <span className="flex justify-between gap-4 items-center font-bold">
          <h3 title={product.name} className="text-start text-xs truncate">
            {product.name}
          </h3>
          <h3 className="text-end text-xs">${product.price}</h3>
        </span>
        <p className="text-xs mt-1 overflow-y-scroll">{product.description}</p>
        <span className="flex justify-end">
          {/* will do nothing if _id is undefined */}
          <button
            onClick={() => addOneToCart(product._id)}
            type="button"
            className="text-xs font-bold px-2 py-1 bg-black rounded-md text-white"
          >
            Add To Cart
          </button>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
