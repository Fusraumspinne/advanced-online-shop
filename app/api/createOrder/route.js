import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Order from "@/models/order";

export async function POST(req) {
    try {
        const { email, adresse, product, productName, totalItems, lieferZeit, datum, status } = await req.json();
        await connectMongoDB();
        await Order.create({ email, adresse, product, productName, totalItems, lieferZeit, datum, status });

        return NextResponse.json({ message: "Bestellung wurde erstellt" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Fehler beim Erstellen einer Bestellung" }, { status: 500 });
    }
}