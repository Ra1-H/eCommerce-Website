import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    category: {
        type: String,
        required: true
    },
    likes:{
        type:Number,
        default: 0
    },
    sumOfRatings: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
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


const Product = mongoose.model("Product", ProductSchema);

export default Product