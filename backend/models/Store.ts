import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    location:{
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


const Store = mongoose.model("Store", StoreSchema);

export default Store