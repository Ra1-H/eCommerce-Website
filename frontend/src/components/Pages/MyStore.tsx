import React, { useEffect } from "react";
import { useCommerceStore } from "../../store";
import { useNavigate } from "react-router-dom";
import AddProduct from "../Forms/AddProduct";
import UserStoreProducts from "../UserStore/UserStoreProducts";



function MyStore() {
  const{token}=useCommerceStore();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      return navigate("/auth/login");
    }
  })
  
  return (
    <div className="w-full flex justify-center items-center h-full">
      
      <AddProduct/>

      <div
        style={{
          display:"block",
          width: "0.2%",
          height:"100%",
          margin: "20px 0",
        }}
      ></div>

      <UserStoreProducts/>

    </div>
  );
}

export default MyStore;
