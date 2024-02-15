import React from "react";
import UserInfo from "./UserInfo";
import { useCommerceStore } from "../../store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Header() {
  const { token,setShowCart } = useCommerceStore();

  return (
    <div className="Header">
      <img src="/e-shop.png" alt="Ecommerce store logo" width={50} />

      <div className="nav flex gap-4 items-center min-h-10">
        <Link to="/home">Home</Link >
        <Link  to="/my-store">My store</Link >
        <Link  to="/my-orders">My orders</Link >
        <FontAwesomeIcon icon={faCartShopping} onClick={()=>setShowCart(true)} className="cursor-pointer" />
      </div>

      {token && (
        <div className="flex items-center">
          <UserInfo/>
        </div>
      )}
    </div>
  );
}

export default Header;
