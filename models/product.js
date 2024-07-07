import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
    {
        produktName: {
            type: String,
            required: true
        },
        stichWörter: {
            type: String,
            required: true
        },
        produktBild: {
            type: String,
            repuired: true
        },
        preis: {
            type: String,
            repuired: true
        },
        ausführlicheBeschreibung: {
            type: String,
            repuired: true
        },
        lieferzeit: {
            type: String,
            repuired: true
        },
        vorrat: {
            type: String,
            repuired: true
        },
        verkäufer: {
            type: String,
            repuired: true
        }
    },
    { timestamps: true }
)

const Product = models.Product || mongoose.model("Product", productSchema)

export default Product