import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {    
    try {
        const { email } = await req.json();
        await connectMongoDB();
        const user = await User.findOne({ email }, 'adresse guthaben');
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen des Benutzers aufgetreten" });
    }
}
