import React, { useState, useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import { useCommerceStore } from "../../store";
import axios from "axios";

function UserStoreProducts() {
  const [userStoreProducts, setUserStoreProducts] = useState([]);
  const { token } = useCommerceStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Token is", token);

        const response = await axios.get(
          "http://localhost:3001/api/v1/users/my-products",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data:", response.data);

        setUserStoreProducts(response.data);
        console.log("User Products:", userStoreProducts);
      } catch (error) {
        console.error("Error fetching user store products:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="w-[69.8%] h-full">
      {userStoreProducts.length === 0 ? (
        <p>No products available for this store.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center">
          {userStoreProducts.map((product) => (
            //@ts-ignore
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserStoreProducts;
