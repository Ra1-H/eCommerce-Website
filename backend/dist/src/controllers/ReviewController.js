"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Review_1 = __importDefault(require("../models/Review"));
class ReviewController {
    static createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   @ts-ignore
                const userId = req === null || req === void 0 ? void 0 : req.decoded.user._id;
                if (!userId) {
                    res.status(400).json({ error: "Token is missing the userId" });
                }
                const { productId, comment, rating } = req.body;
                const review = new Review_1.default({
                    comment, rating, user: userId, product: productId
                });
                const error = review.validateSync();
                if (error) {
                    console.log(error);
                    return res.status(400).json({ error: "Failed to create review!" });
                }
                yield review.save();
                console.log("review created: ", review);
                res.json({ message: "Review created successfully!", review });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error,Failed to create review" });
            }
        });
    }
    static getReviewsForProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.productId) {
                    return res.status(400).json({ error: "Product ID is required!" });
                }
                const reviews = yield Review_1.default.find({
                    product: req.params.productId,
                });
                res.json(reviews);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to get reviews for the product!" });
            }
        });
    }
}
exports.default = ReviewController;
