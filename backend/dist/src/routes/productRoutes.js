"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../../controllers/ProductController"));
const auth_1 = require("../../middleware/auth");
const multer_1 = require("../../middleware/multer");
const productRouter = express_1.default.Router();
// Other routes...
// Create a new product
productRouter.post("/create", auth_1.auth, multer_1.productPicturesUpload.array("product-pictures"), ProductController_1.default.createProduct);
// Get all products
productRouter.get("/all", ProductController_1.default.getAllProducts);
// Get a specific product by ID
productRouter.get("/:productId", ProductController_1.default.getProductById);
productRouter.get("/cart", auth_1.auth, ProductController_1.default.getCartProducts);
exports.default = productRouter;
