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
        product: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        totalItems: {
            type: String,
            required: true
        },
        lieferZeit: {
            type: String,
            required: true
        },
        datum: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Order = models.Order || mongoose.model("Order", orderSchema)

export default Order