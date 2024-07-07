"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import { useSession } from "next-auth/react"

function Productcreation() {
    const [produktName, setProduktName] = useState("")
    const [stichWörter, setStichWörter] = useState("")
    const [produktBild, setProduktBild] = useState("")
    const [preis, setPreis] = useState("")
    const [ausführlicheBeschreibung, setAusführlicheBeschreibung] = useState("")
    const [lieferzeit, setLieferzeit] = useState("")
    const [vorrat, setVorrat] = useState("")
    const [verkäufer, setVerkäufer] = useState("")

    const { data: session } = useSession()

    useEffect(() => {
        setVerkäufer(session?.user?.name)
        setProduktBild("/image-placeholder.png")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!produktName || !stichWörter || !produktBild || !preis || !ausführlicheBeschreibung || !lieferzeit || !vorrat || !verkäufer) {
            console.log("Alle Informationen werden benötigt")
            return
        }

        try {
            const res = await fetch("/api/createProduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    produktName,
                    stichWörter,
                    produktBild,
                    preis,
                    ausführlicheBeschreibung,
                    lieferzeit,
                    vorrat,
                    verkäufer
                })
            })

            if (res.ok) {
                console.log("Product created")
                const form = e.target
                form.reset()
            } else {
                console.log("Creating product failed")
            }
        } catch (error) {
            console.log("Error during creating product: ", error)
        }
    }

    return (
        <div>
            <Navigationbar />

            <div>
                <form onSubmit={handleSubmit}>
                    <Input placeholder={"Produktname"} type={"text"} onChange={(e) => setProduktName(e.target.value)} />
                    <Textarea placeholder={"Stichwörter"} rows={5} onChange={(e) => setStichWörter(e.target.value)} />
                    <Input placeholder={"Produktbild"} type={"file"} disabled={true} />
                    <Input placeholder={"Preis"} type={"text"} onChange={(e) => setPreis(e.target.value)} />
                    <Textarea placeholder={"Ausführliche Beschreibung"} rows={5} onChange={(e) => setAusführlicheBeschreibung(e.target.value)} />
                    <Input placeholder={"Lieferzeit"} type={"text"} onChange={(e) => setLieferzeit(e.target.value)} />
                    <Input placeholder={"Vorrat"} type={"text"} onChange={(e) => setVorrat(e.target.value)} />

                    <MagicButton type={"submit"} content={"Create"} />
                </form>
            </div>
        </div>
    )
}

export default Productcreation