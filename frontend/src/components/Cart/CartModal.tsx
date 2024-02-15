import React from "react";
import { useCommerceStore } from "../../store";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function CartModal() {
  const navigate = useNavigate();

  const { token, cart, emptyCart, setShowCart } = useCommerceStore();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const response = await fetch(
        "http://localhost:3001/api/v1/products/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: Object.keys(cart),
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      setCartProducts(result);
    };

    fetchCartProducts();
  }, []);

  const handleConfirmOrder = async () => {
    const nonZeroQuantityProducts = cartProducts.filter(
      // @ts-ignore
      (product) => cart[product._id] > 0
    );

    if (nonZeroQuantityProducts.length === 0) {
      // Display a message or handle the case where there are no products with non-zero quantity
      console.log("Cart is empty or all product quantities are 0");
      return;
    }

    const response = await fetch("http://localhost:3001/api/v1/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: nonZeroQuantityProducts.reduce((acc, product) => {
          // @ts-ignore
          acc[product._id] = cart[product._id];
          return acc;
        }, {}),
      }),
    });

    if (response.status === 200) {
      const result = await response.json();
      // empty cart
      emptyCart();
      // hide cart Modal
      setShowCart(false);
      // navigate to my orders page
      navigate("/my-orders");
      console.log("response to creating an order:", result);
    }
  };

  const getTotal = () => {
    let total = 0;
    if (!cartProducts.length) {
      return "0";
    }
    cartProducts.forEach((product: any) => {
      let price = product.price;
      // @ts-ignore
      let quantity = cart[product._id];

      if (!price || !quantity) {
        // jump over this element
        return;
      }

      total = total + quantity * price;
    });
    console.log(total);
    return total.toString();
  };

  return (
    <div className="overflow-y-scroll w-full h-full absolute bg-[rgba(1,1,1,0.95)] z-10 p-6 text-white font-bold text-xl">
      <span className="flex justify-between">
        <div>Cart</div>
        <p className="cursor-pointer" onClick={() => setShowCart(false)}>
          X
        </p>
      </span>
      <div className="flex flex-col gap-4 mt-6">
        {cartProducts.length &&
          cartProducts.map((product) => {
            // @ts-ignore
            return (
              <CartItem
                // @ts-ignore
                key={product._id}
                // @ts-ignore
                product={product}
                // @ts-ignore
                number={cart[product._id]}
              />
            );
          })}
      </div>
      <div className="flex justify-between mt-6">
        Total: ${getTotal()}
        <button
          className="green-button"
          onClick={handleConfirmOrder}
          type="button"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default CartModal;
