"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String
    },
    pictures: {
        required: true,
        type: [String]
    },
    store: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    category: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
