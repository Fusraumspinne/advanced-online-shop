import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function POST(req) {
    try {
        await connectMongoDB();
        const products = await Product.find(); 
        return NextResponse.json({ products });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Produkte aufgetreten" });
    }
}
