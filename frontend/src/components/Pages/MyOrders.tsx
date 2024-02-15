import React, { useEffect, useState } from "react";
import { useCommerceStore } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderedProductCard from "../Orders/OrderedProductCard";

export default function MyOrders() {
  const navigate = useNavigate();
  const { token } = useCommerceStore();

  const [myOrders, setMyOrders] = useState<any[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
    // localhost:5000/api/v1/users/register
    axios
      .get("http://localhost:3001/api/v1/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response: any) {
        console.log("this is response to fetched orders: ", response);
        if (Array.isArray(response.data)) {
          setMyOrders(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function calculateTotal(products: any[]) {
    return products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  }

  const handleRowClick = (order: any) => {
    setSelectedOrder(selectedOrder === order ? null : order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  function OrderedProductCardList({ products }: { products: any[] }) {
    return (
      <div>
        {products.map((product: any) => (
          // @ts-ignore
          <OrderedProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <>
      <h1>MyOrders</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order) => (
            <tr
              key={order._id}
              onClick={() => handleRowClick(order)}
              className="cursor-pointer transition-all hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">
                <button className=" bg-green-500 text-white px-4 py-2 rounded">show products</button>
              </td>
              <td className="py-2 px-4 border-b">
                ${calculateTotal(order.products)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <OrderedProductCardList products={selectedOrder.products} />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

