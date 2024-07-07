import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function POST(req) {
    try {
        const { produktName, stichWörter, produktBild, preis, ausführlicheBeschreibung, lieferzeit, vorrat, verkäufer } = await req.json()
        await connectMongoDB()
        await Product.create({produktName, stichWörter, produktBild, preis, ausführlicheBeschreibung, lieferzeit, vorrat, verkäufer})

        return NextResponse.json({ message: "Product created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while creating product" },{ status: 500 });
    }
}