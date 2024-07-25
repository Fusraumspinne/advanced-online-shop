import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Order from "@/models/order";

export async function POST(req) {
    try {
        const { email, adresse, productPrice, totalItems, lieferKosten, totalPrice, warenkorb } = await req.json()
        await connectMongoDB()
        await Order.create({ email, adresse, productPrice, totalItems, lieferKosten, totalPrice, warenkorb })

        return NextResponse.json({ message: "Bestellung wurde erstellt" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Fehler beim erstellen einer Bestellung" },{ status: 500 });
    }
}