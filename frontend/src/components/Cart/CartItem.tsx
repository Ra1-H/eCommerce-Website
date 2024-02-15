import React from 'react'
import { useCommerceStore } from "../../store"
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

function CartItem({ product, number }: { product: any, number: number }) {

  const {
    addOneToCart,
    removeOneFromCart
  } = useCommerceStore()

  console.log(product)

 

  return (
    <div className="flex justify-between items-center rounded-xl overflow-clip bg-gray-700">
      <div className="w-[25%]">
        <img src="/pexels-photo-90946.webp" alt="" />
      </div>
      <div className="w-[50%] flex flex-col">
        <div>{product.name}</div>
         <div>{product.description}</div>
         <div>$ {product.price}</div>
      </div>
      <div className="w-[220px] px-10 flex items-center justify-between">
        <CiSquareMinus className="cursor-pointer" onClick={() => removeOneFromCart(product._id)} size={40} />
        <p className="text-2xl">{number}</p>
        <CiSquarePlus className="cursor-pointer" onClick={() => { addOneToCart(product._id)}} size={40} />
      </div>
    </div>
  )
}

export default CartItem