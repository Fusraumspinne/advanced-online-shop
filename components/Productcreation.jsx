"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import { useSession } from "next-auth/react"
import Productcard from './ui/Productcard'

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

                setProduktName("");
                setStichWörter("");
                setPreis("");
                setAusführlicheBeschreibung("");
                setLieferzeit("");
                setVorrat("");
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

            <div style={{ marginTop: "56px" }}>
                <div className='row mx-4'>
                    <div className='col-6' style={{ maxHeight: "calc(100vh - 54px)", overflowY: "auto" }}>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder={"Bastelschere"} type={"text"} onChange={(e) => setProduktName(e.target.value)} isLabel={true} contentLabel={"Produktname"} extraClass={"mt-4"}/>
                            <Textarea placeholder={"Scharf Basteln Schere Kinder Werkzeug"} rows={5} onChange={(e) => setStichWörter(e.target.value)} isLabel={true} contentLabel={"Stichwörter"} extraClass={"mt-4"}/>
                            <Input placeholder={"Produktbild"} type={"file"} disabled={true} isLabel={true} contentLabel={"Bild"} extraClass={"mt-4"}/>
                            <Input placeholder={"8.99"} type={"text"} onChange={(e) => setPreis(e.target.value)} isLabel={true} contentLabel={"Preis"} extraClass={"mt-4"}/>
                            <Textarea placeholder={"Aus hartem Stahl gefertigt um Jahre mit Kindern und harter Benutzung stand halten zu können."} rows={5} onChange={(e) => setAusführlicheBeschreibung(e.target.value)} isLabel={true} contentLabel={"Ausführliche Beschreibung"} extraClass={"mt-4"}/>
                            <Input placeholder={"1-2 Werktage"} type={"text"} onChange={(e) => setLieferzeit(e.target.value)} isLabel={true} contentLabel={"Lieferzeit"} extraClass={"mt-4"}/>
                            <Input placeholder={"23"} type={"text"} onChange={(e) => setVorrat(e.target.value)} isLabel={true} contentLabel={"Vorrat"} extraClass={"mt-4"}/>

                            <MagicButton type={"submit"} content={"Create"} extraClass={"mt-4 mb-4 full_width-_button"}/>
                        </form>
                    </div>
                    <div className='col-6 d-flex justify-content-center align-items-center'>
                        <Productcard
                            produktname={produktName}
                            preis={preis}
                            stichwörter={stichWörter}
                            produktbild={produktBild}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productcreation