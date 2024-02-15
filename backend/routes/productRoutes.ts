import express from "express";
import ProductController from "../controllers/ProductController";
import { auth } from "../middleware/auth";
import { productPicturesUpload } from "../middleware/multer";

const productRouter = express.Router();

// Other routes...

// Create a new product
productRouter.post(
  "/create",
  auth,
  productPicturesUpload.array("product-pictures"),
  ProductController.createProduct
);

// Get all products
productRouter.get("/all", ProductController.getAllProducts);

// Get a specific product by ID
productRouter.get("/:productId", ProductController.getProductById);

productRouter.post("/cart", auth, ProductController.getCartProducts);

export default productRouter;
