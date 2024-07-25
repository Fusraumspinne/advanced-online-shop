import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Order from "@/models/order";

export async function POST(req) {
    try {
        const { email } = await req.json()
        await connectMongoDB();
        const orders = await Order.find({ email });
        return NextResponse.json({ orders });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Bestellungen aufgetreten" });
    }
}
