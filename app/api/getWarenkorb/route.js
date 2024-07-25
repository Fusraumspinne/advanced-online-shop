import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Warenkorb from "@/models/warenkorb";

export async function POST(req) {    
    try {
        const {email} = await req.json()
        await connectMongoDB();
        const warenkorb = await Warenkorb.find({ email }); 
        return NextResponse.json({ warenkorb });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen des Warenkobs aufgetreten" });
    }
}
