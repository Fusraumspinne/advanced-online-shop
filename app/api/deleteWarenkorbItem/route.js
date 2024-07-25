import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Warenkorb from "@/models/warenkorb";

export async function POST(req) {
    try {
        const _id = await req.json()
        await connectMongoDB()
        await Warenkorb.deleteOne({ _id })

        return NextResponse.json({ message: "Warenkorbitem wurde gelöscht" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Ein Fehler ist beim löschen eines Warenkobitems aufgetreten" },{ status: 500 });
    }
}