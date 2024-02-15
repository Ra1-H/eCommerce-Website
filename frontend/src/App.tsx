import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Auth from "./components/Pages/Auth";
import Home from "./components/Pages/Home";
import FiltersBar from "./components/Filter/FiltersBar";
import Header from "./components/Header/Header";
import CreateStore from "./components/Forms/CreateStore";
import MyOrders from "./components/Pages/MyOrders";
import MyStore from "./components/Pages/MyStore";
import { useCommerceStore } from "./store";
import CartModal from "./components/Cart/CartModal";

function App() {
  const {showCart}=useCommerceStore()

  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const pathsToShowFilters = ["/home", "/my-store"];
    if (pathsToShowFilters.includes(location.pathname)) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [location]);

  return (
    <div className="App">
      {showCart && <CartModal />}
      
      <Header />
      {showFilters && <FiltersBar />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/auth/*" element={<Auth />} />

        <Route path="/create-store" element={<CreateStore />} />

        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/my-store" element={<MyStore />} />
      </Routes>
    </div>
  );
}

export default App;
