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
const Store_1 = __importDefault(require("../models/Store"));
const User_1 = __importDefault(require("../models/User"));
class StoreController {
    static createStore(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the logo path based on the uploaded file's filename
                const logoPath = "/logos/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
                // Extract the owner's ID from the decoded token
                // @ts-ignore
                const ownerId = req === null || req === void 0 ? void 0 : req.decoded.user._id;
                // Check if ownerId is missing in the token
                if (!ownerId) {
                    res.status(400).json({ error: "Token missing ownerId!" });
                }
                // Extract necessary information from the request body
                const { name, description, location } = req.body;
                // Find the owner (user) based on the extracted ownerId
                const owner = yield User_1.default.findById(ownerId);
                // Check if the owner exists
                if (!owner) {
                    throw new Error("User does not exist");
                }
                // Check if the owner already owns a store
                if (owner === null || owner === void 0 ? void 0 : owner.toJSON().store) {
                    return res.status(400).json({ error: "User already owns a store!" });
                }
                // Create a new store instance with the provided information
                const store = new Store_1.default({
                    name,
                    description,
                    location,
                    owner: ownerId,
                    logo: logoPath,
                });
                // Validate the store model
                const error = store.validateSync();
                // Check if validation failed
                if (error) {
                    console.log(error);
                    return res.status(400).json({ error: "Failed to create store!" });
                }
                // Save the store to the database
                yield store.save();
                // Update the owner's store reference
                owner.store = store._id;
                // Save the updated owner information
                yield owner.save();
                res.json(store);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: "Failed to create store!" });
            }
        });
    }
    static getStoreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.storeId) {
                    return;
                }
                const store = yield Store_1.default.findOne({
                    _id: req.params.storeId,
                });
                if (!store) {
                    return res.status(404).json({ error: "Store not found!" });
                }
                res.json(store);
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ error: "Internal server error, failed to fetch store!" });
            }
        });
    }
}
exports.default = StoreController;
