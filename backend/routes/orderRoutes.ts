// routes/orderRoutes.ts
import express from "express";
import OrderController from "../controllers/OrderController";
import { auth } from "../middleware/auth";

const orderRouter = express.Router();

// Create a new order
orderRouter.post("/create", auth, OrderController.createOrder);

// Get all orders for the logged-in user
orderRouter.get("/my-orders", auth, OrderController.getMyOrders);

// Get all orders for a specific store (for the store owner)
orderRouter.get("/store/:storeId", auth, OrderController.getStoreOrders);

// Change order status (e.g., from pending to processing)
orderRouter.put(
  "/:orderId/change-status",
  auth,
  OrderController.changeOrderStatus
);

export default orderRouter;
