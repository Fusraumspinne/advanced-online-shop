import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        productPrice : {
            type: String,
            required: true
        }, 
        totalItems: {
            type: String,
            required: true
        }, 
        lieferKosten: {
            type: String,
            required: true
        }, 
        totalPrice: {
            type: String, 
            required: true
        },
        warenkorb: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)

const Order = models.Order || mongoose.model("Order", orderSchema)

export default Order