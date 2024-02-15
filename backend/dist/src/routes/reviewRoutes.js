"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReviewController_1 = __importDefault(require("../../controllers/ReviewController"));
const auth_1 = require("../../middleware/auth");
const reviewRouter = express_1.default.Router();
// Create a new review
reviewRouter.post("/create", auth_1.auth, ReviewController_1.default.createReview);
// Get reviews for a specific product
reviewRouter.get("/product/:productId", ReviewController_1.default.getReviewsForProduct);
exports.default = reviewRouter;
