import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Warenkorb from "@/models/warenkorb";

export async function POST(req) {
    try {
        const { email, produkt, anzahl, preis, produktName, lieferzeit, vorrat, produktBild } = await req.json()
        await connectMongoDB()
        await Warenkorb.create({ email, produkt, anzahl, preis, produktName, lieferzeit, vorrat, produktBild })

        return NextResponse.json({ message: "Product created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while creating product" }, { status: 500 });
    }
}