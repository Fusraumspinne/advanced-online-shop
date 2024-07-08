import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function POST(req) {    
    try {
        const _id = await req.json()
        await connectMongoDB();
        const product = await Product.findOne({ _id }); 
        return NextResponse.json({ product });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen des Produktes aufgetreten" });
    }
}
