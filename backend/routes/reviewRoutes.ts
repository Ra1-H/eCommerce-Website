import express from "express";
import ReviewController from "../controllers/ReviewController";
import { auth } from "../middleware/auth";

const reviewRouter = express.Router();

// Create a new review
reviewRouter.post("/create", auth, ReviewController.createReview);

// Get reviews for a specific product
reviewRouter.get("/product/:productId", ReviewController.getReviewsForProduct);

export default reviewRouter;
