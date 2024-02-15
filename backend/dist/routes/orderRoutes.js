"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const auth_1 = require("../middleware/auth");
const orderRouter = express_1.default.Router();
// Create a new order
orderRouter.post("/create", auth_1.auth, OrderController_1.default.createOrder);
// Get all orders for the logged-in user
orderRouter.get("/my-orders", auth_1.auth, OrderController_1.default.getMyOrders);
// Get all orders for a specific store (for the store owner)
orderRouter.get("/store/:storeId", auth_1.auth, OrderController_1.default.getStoreOrders);
// Change order status (e.g., from pending to processing)
orderRouter.put("/:orderId/change-status", auth_1.auth, OrderController_1.default.changeOrderStatus);
exports.default = orderRouter;
