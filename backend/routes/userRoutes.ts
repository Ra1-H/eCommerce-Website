import express from "express";
import UserController from "../controllers/UserController";
import { auth } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

// Endpoint to get products added by the logged-in user
userRouter.get("/my-products", auth, UserController.getProducts);

export default userRouter;
