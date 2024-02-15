import { Request, Response } from "express";
import Review from "../models/Review";
import Product from "../models/Product";

class ReviewController {
  static async createReview(req: Request, res: Response) {
    try {
      //   @ts-ignore
      const userId = req?.decoded.user._id;

      if (!userId) {
        res.status(400).json({ error: "Token is missing the userId" });
      }

      const { productId, comment, rating } = req.body;

      const review = new Review({
        comment,
        rating,
        user: userId,
        product: productId,
      });

      const product = await Product.findOne({ _id: productId })

      const newSumOfRatings = product?.sumOfRatings + rating;

      const newNumberOfReviews = (product?.numberOfReviews || 0) + 1

      const updatedProduct = await Product.findByIdAndUpdate({
          _id: productId
      }, {
          sumOfRatings: newSumOfRatings,
          numberOfReviews: newNumberOfReviews
      }, {
          new: true
      });

      console.log("Reviewed Product updated on backend: ",updatedProduct)

      const error = review.validateSync();

      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to validate review!" });
      }

      await review.save();
      console.log("review created: ", review);

      res.json({ message: "Review created successfully!", review });
      
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal server error,Failed to create review" });
    }
  }

  static async getReviewsForProduct(req: Request, res: Response) {
    try {
      if (!req.params.productId) {
        return res.status(400).json({ error: "Product ID is required!" });
      }

      const reviews = await Review.find({
        product: req.params.productId,
      });

      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to get reviews for the product!" });
    }
  }
}

export default ReviewController;
