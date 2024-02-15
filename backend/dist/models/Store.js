"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const StoreSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    logo: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    location: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        default: true
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
const Store = mongoose_1.default.model("Store", StoreSchema);
exports.default = Store;
