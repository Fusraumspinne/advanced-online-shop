import { connectMongoDB } from "@/lib/mongodb";
import Warenkorb from "@/models/warenkorb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectMongoDB();
    const result = await Warenkorb.deleteMany({ email: email });

    if (result.deletedCount > 0) {
      return NextResponse.json({ message: "Alle Produkte wurden gelöscht" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Keine Produkte gefunden" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Ein Fehler ist beim Löschen der Produkte aufgetreten" }, { status: 500 });
  }
}
