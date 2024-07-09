import mongoose, { Schema, models } from "mongoose";

const warenkorbSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        produkt: {
            type: String,
            required: true
        },
        anzahl: {
            type: Number,
            repuired: true
        },
        preis: {
            type: String,
            required: true
        },
        produktName: {
            type: String,
            required: true
        },
        lieferzeit: {
            type: String,
            required: true
        }, 
        vorrat: {
            type: Number,
            required: true
        },
        produktBild: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Warenkorb = models.Warenkorb || mongoose.model("Warenkorb", warenkorbSchema)

export default Warenkorb