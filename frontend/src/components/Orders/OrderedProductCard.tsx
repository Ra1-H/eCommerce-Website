import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import Review from '../Forms/Review';

interface OrderedProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    quantity: number; // Added quantity for ordered products
  };
}

function OrderedProductCard({ product }: OrderedProductCardProps) {

    //reviews
    const [showReviewForm, setShowReviewForm] = useState(false);
    const handleReview = () => {
        // Toggle the visibility of the review form
        setShowReviewForm(!showReviewForm);
      };

  return (
    <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
      <div className="top h-[60%] relative">
        {/* Store name removed for simplicity */}
        <img className="object-cover h-full" src="/pexels-photo-90946.webp" alt="" />
        <BsHeartFill className="absolute bottom-2 right-2 BsHeart-main" />
      </div>
      <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
        <span className="flex justify-between gap-4 items-center font-bold">
          <h3 title={product.name} className="text-start text-xs truncate">
            {product.name}
          </h3>
          <h3 className="text-end text-xs">${product.price}</h3>
        </span>
        <p className="text-xs mt-1 overflow-y-scroll">{product.description}</p>
        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
        <span className="flex justify-end">
          <button
            onClick={handleReview}
            type="button"
            className="text-xs font-bold px-2 py-1 bg-gray-500 rounded-md text-white"
          >
            Review
          </button>
          {/* @ts-ignore */}
          {showReviewForm && <Review productId={product._id} onReviewSubmit={() => setShowReviewForm(false)} />}
        </span>
      </div>
    </div>
  );
}

export default OrderedProductCard;