import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { name, email, password, guthaben, adresse } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        await User.create({name, email, password: hashedPassword, guthaben, adresse})

        return NextResponse.json({ message: "User wurde erstellt" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Ein Fehler ist beim erstellen eines Users aufgetreten" }, { status: 500 })
    }
}