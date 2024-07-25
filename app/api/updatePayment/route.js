import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function PUT(req) {
    try {
        const { email, guthaben, adresse } = await req.json();

        await connectMongoDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Benutzer nicht gefunden." }, { status: 404 });
        }

        user.guthaben = guthaben;
        user.adresse = adresse;
        await user.save();

        return NextResponse.json({ message: "Benutzer erfolgreich aktualisiert." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Fehler beim Aktualisieren des Benutzers" }, { status: 500 });
    }
}