"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    user: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
}, {
    timestamps: true
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
