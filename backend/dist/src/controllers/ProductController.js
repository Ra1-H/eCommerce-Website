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
const Product_1 = __importDefault(require("../models/Product"));
const Store_1 = __importDefault(require("../models/Store"));
class ProductController {
    // Other methods...
    static createProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const productPictures = (_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => `/product-pictures/${file.filename}`);
                // @ts-ignore
                const userId = req.decoded.user._id;
                const store = yield Store_1.default.findOne({
                    owner: userId,
                });
                if (!store || !store.approved) {
                    console.log(Store_1.default);
                    return res.status(400).json({
                        error: "You either don't have a store or Your store isn't yet approved!",
                    });
                }
                const product = new Product_1.default({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category,
                    store: store._id,
                    pictures: productPictures,
                });
                const error = product.validateSync();
                if (error) {
                    console.log(error);
                    return res.status(400).json({ error: "Failed to validate product!" });
                }
                yield product.save();
                res.json({ message: "product created: ", product });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "failed to create product" });
            }
        });
    }
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Product_1.default.find();
                res.json(products);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "failed to get products" });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.productId) {
                    return;
                }
                const product = yield Product_1.default.findOne({
                    _id: req.params.productId,
                });
                res.json(product);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to get product!" });
            }
        });
    }
    static getCartProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { cart } = req.body;
                if (!cart.length) {
                    return res.json({ error: "empty cart" });
                }
                console.log(cart);
                const products = yield Product_1.default.find({
                    _id: { $in: cart },
                }).exec();
                res.json({ message: "products in cart", products });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to get products for cart!" });
            }
        });
    }
}
exports.default = ProductController;
