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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const saltRounds = 10;
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    return;
                }
                const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
                const user = new User_1.default({
                    name,
                    email,
                    password: hashedPassword,
                });
                const error = user.validateSync();
                if (error) {
                    console.log(error);
                    return res.status(400).json({ error: "Failed to register!" });
                }
                yield user.save();
                console.log("registered: ", user);
                const tokenPayload = {
                    user: Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toJSON()), { password: "" }),
                    username: user === null || user === void 0 ? void 0 : user.name,
                };
                // @ts-ignore
                const token = jsonwebtoken_1.default.sign(tokenPayload, TOKEN_SECRET);
                res.json({ token, username: user === null || user === void 0 ? void 0 : user.name });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ error: "Internal server error, Failed to create User!" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({
                    email,
                });
                if (!user) {
                    res.status(401).json({ error: "User not found! Please register" });
                }
                // verify password
                // @ts-ignore
                const verification = bcrypt_1.default.compareSync(password, user.password);
                if (!verification) {
                    return res.status(400).json({ error: "Wrong Credentials!" });
                }
                console.log("Successful log-in: ", user);
                const tokenPayload = {
                    user: Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toJSON()), { password: "" }),
                    username: user === null || user === void 0 ? void 0 : user.name, // Assuming your username field is 'name', modify accordingly
                };
                //@ts-ignore
                const token = jsonwebtoken_1.default.sign(tokenPayload, TOKEN_SECRET);
                res.json({ token, username: user === null || user === void 0 ? void 0 : user.name });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: "Internal server error,Failed to login!" });
            }
        });
    }
    //to get products added by the logged-in user
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const userId = req === null || req === void 0 ? void 0 : req.decoded.user._id;
                if (!userId) {
                    res.status(400).json({ error: "Token missing userId!" });
                    return;
                }
                const user = yield User_1.default.findById(userId);
                if (!user) {
                    throw new Error("Invalid user");
                }
                let userProducts;
                if (user.store) {
                    // If the user has a store, fetch products associated with the store
                    userProducts = yield Product_1.default.find({ store: user.store });
                }
                console.log("Fetched user products:", userProducts);
                // Respond with the user's products in JSON format
                res.json(userProducts);
            }
            catch (error) {
                console.error("Error fetching user products:", error);
                res.status(400).json({ error: "Failed to get user products!" });
            }
        });
    }
}
exports.default = UserController;
