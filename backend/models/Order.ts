import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type:Object,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
}, {
    timestamps: true
})




const Order = mongoose.model("Order", OrderSchema);

export default Order