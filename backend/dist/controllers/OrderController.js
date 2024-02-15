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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
class OrderController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const userId = req === null || req === void 0 ? void 0 : req.decoded.user._id;
                if (!userId) {
                    res.status(400).json({ error: "Token missing userId!" });
                }
                const { cart } = req.body;
                const order = new Order_1.default({
                    user: userId,
                    products: cart,
                });
                const error = order.validateSync();
                if (error) {
                    console.log(error);
                    return res.status(400).json({ error: "Failed to validate order!" });
                }
                yield order.save();
                res.json({ message: "order created successfully", order });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ error: "interbal server error, Failed to create order!" });
            }
        });
    }
    static getMyOrders(req, res) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const userId = req === null || req === void 0 ? void 0 : req.decoded.user._id;
                if (!userId) {
                    return res.status(400).json({ error: "Token missing userId!" });
                }
                const orders = yield Order_1.default.find({ user: userId }).exec();
                let populatedOrders = [];
                try {
                    //   iterates over each order found for the user
                    for (var _d = true, orders_1 = __asyncValues(orders), orders_1_1; orders_1_1 = yield orders_1.next(), _a = orders_1_1.done, !_a;) {
                        _c = orders_1_1.value;
                        _d = false;
                        try {
                            const order = _c;
                            // order.products contains an object where the keys are product IDs and the values are quantities.
                            const productQuantities = order.products;
                            // This line queries the Product model to find all products whose IDs are in the array.In other words, it retrieves all products that are part of the current order.
                            let products = yield Product_1.default.find({
                                _id: { $in: Object.keys(productQuantities) },
                            }).exec();
                            // For each product found, it maps the product's information along with the corresponding quantity from productQuantities. This creates an array of products with additional quantity information.
                            // @ts-ignore
                            products = products.map((product) => {
                                return Object.assign(Object.assign({}, product.toJSON()), { quantity: productQuantities[product.id] });
                            });
                            // The order information is spread (...order.toJSON()) to include all properties of the order, and the products property is replaced with the array of products generated in the previous step
                            populatedOrders.push(Object.assign(Object.assign({}, order.toJSON()), { products: products }));
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = orders_1.return)) yield _b.call(orders_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                //   he response sent to the client includes an array of orders, and each order contains an array of products with their quantities.
                res.json(populatedOrders);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to get orders!" });
            }
        });
    }
    static getStoreOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const storeId = req === null || req === void 0 ? void 0 : req.decoded.user.store;
                if (!storeId) {
                    return res.status(400).json({ error: "Store ID not found!" });
                }
                //This line queries the Order model to find all orders. The populate method is used to replace the product field in the products array of each order with the actual product details. The model: Product option specifies that the product details should come from the Product model
                const orders = yield Order_1.default.find()
                    .populate({
                    path: "products.product",
                    model: Product_1.default,
                })
                    .exec();
                // After fetching all orders, this code filters them to include only those related to the specified store (storeId)
                const storeOrders = orders.filter((order) => order.products.some((product) => product.product.store.toString() === storeId.toString()));
                res.json(storeOrders);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to get store orders!" });
            }
        });
    }
    static changeOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const orderId = req.params.orderId;
                const { newStatus } = req.body;
                if (!orderId || !newStatus) {
                    return res
                        .status(400)
                        .json({ error: "Order ID and status are required!" });
                }
                const order = yield Order_1.default.findById(orderId);
                if (!order) {
                    return res.status(404).json({ error: "Order not found!" });
                }
                order.status = newStatus;
                yield order.save();
                res.json(order);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to change order status!" });
            }
        });
    }
}
exports.default = OrderController;
