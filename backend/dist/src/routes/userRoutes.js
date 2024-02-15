"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../controllers/UserController"));
const auth_1 = require("../../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post("/register", UserController_1.default.register);
userRouter.post("/login", UserController_1.default.login);
// Endpoint to get products added by the logged-in user
userRouter.get("/my-products", auth_1.auth, UserController_1.default.getProducts);
exports.default = userRouter;
