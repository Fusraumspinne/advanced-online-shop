import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Warenkorb from "@/models/warenkorb";

export async function POST(req) {
    try {
        const { email, produkt, anzahl, preis, produktName, lieferzeit, produktBild } = await req.json()
        await connectMongoDB()
        await Warenkorb.create({ email, produkt, anzahl, preis, produktName, lieferzeit, produktBild })

        return NextResponse.json({ message: "Produkt wurde zum Warenkorb hinzugefügt" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "EinFehler ist beim hinzufüge eines Produktes zum Warenkorb aufgetreten" }, { status: 500 });
    }
}