"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import { useSession } from "next-auth/react"
import Productcard from './ui/Productcard'
import Image from 'next/image'

function Productcreation() {
    const [produktName, setProduktName] = useState("")
    const [stichWörter, setStichWörter] = useState("")
    const [produktBild, setProduktBild] = useState("")
    const [preis, setPreis] = useState("")
    const [ausführlicheBeschreibung, setAusführlicheBeschreibung] = useState("")
    const [lieferzeit, setLieferzeit] = useState("")
    const [vorrat, setVorrat] = useState()
    const [verkäufer, setVerkäufer] = useState("")
    const [vorschauCard, setVoraschauCard] = useState(true)

    const { data: session } = useSession()

    useEffect(() => {
        setVerkäufer(session?.user?.name)
        setProduktBild("/image-placeholder.png")
    }, [session])

    const formatPrice = (price) => {
        const priceNumber = typeof price === 'string' ? parseFloat(price.replace('.', '').replace(',', '.')) : price;
        return priceNumber.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }).replace('€', '').trim();
    }

    const convertToBase64 = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setProduktBild(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: " + error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!produktName || !stichWörter || !produktBild || !preis || !ausführlicheBeschreibung || !lieferzeit || !vorrat || !verkäufer) {
            console.log("Alle Inputfelder werden benötigt")

            console.log(produktName, stichWörter, produktBild, preis, ausführlicheBeschreibung, lieferzeit, vorrat, verkäufer)
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
                console.log("Produkt wurde ersellt")
                const form = e.target
                form.reset()

                setProduktName("");
                setStichWörter("");
                setPreis("");
                setAusführlicheBeschreibung("");
                setLieferzeit("");
                setVorrat();
            } else {
                console.log("Fehler beim erstellen eines Produktes")
            }
        } catch (error) {
            console.log("Fehler beim erstellen eines Produktes: ", error)
        }
    }

    return (
        <div>
            <Navigationbar />

            <div style={{ marginTop: "56px" }}>
                <div className='row mx-4'>
                    <div className='col-6' style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder={"Bastelschere"} type={"text"} onChange={(e) => setProduktName(e.target.value)} isLabel={true} contentLabel={"Produktname"} extraClass={"mt-4"} />
                            <Textarea placeholder={"Scharf Basteln Schere Kinder Werkzeug"} rows={5} onChange={(e) => setStichWörter(e.target.value)} isLabel={true} contentLabel={"Stichwörter"} extraClass={"mt-4"} />
                            <Input placeholder={"Produktbild"} type={"file"} isLabel={true} contentLabel={"Bild"} extraClass={"mt-4"} onChange={convertToBase64} accept={"image/*"}/>
                            <Input placeholder={"8,99"} type={"text"} onChange={(e) => setPreis(formatPrice(e.target.value))} isLabel={true} contentLabel={"Preis"} extraClass={"mt-4"} />
                            <Textarea placeholder={"Aus hartem Stahl gefertigt um Jahre mit Kindern und harter Benutzung stand halten zu können."} rows={5} onChange={(e) => setAusführlicheBeschreibung(e.target.value)} isLabel={true} contentLabel={"Ausführliche Beschreibung"} extraClass={"mt-4"} />
                            <Input placeholder={"1-2"} type={"text"} onChange={(e) => setLieferzeit(e.target.value)} isLabel={true} contentLabel={"Lieferzeit"} extraClass={"mt-4"} />
                            <Input placeholder={"23"} type={"text"} onChange={(e) => setVorrat(e.target.value)} isLabel={true} contentLabel={"Vorrat"} extraClass={"mt-4"} />

                            <div className='row'>
                                <div className='col-9'>
                                    <MagicButton type={"submit"} content={"Create"} extraClass={"mt-4 mb-4 full_width_button"} />
                                </div>

                                <div className='col-3'>
                                    {vorschauCard ? (
                                        <MagicButton content={"Seitenvorschau"} extraClass={"mt-4 mb-4 full_width_button"} funktion={() => setVoraschauCard(false)} />
                                    ) : (
                                        <MagicButton content={"Cardvorschau"} extraClass={"mt-4 mb-4 full_width_button"} funktion={() => setVoraschauCard(true)} />
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-6 d-flex justify-content-center align-items-center'>
                        {vorschauCard ? (
                            <div>
                                <Productcard
                                    produktname={produktName}
                                    preis={preis}
                                    stichwörter={stichWörter}
                                    produktbild={produktBild}
                                />
                            </div>
                        ) : (
                            <div className='card py-4'>
                                <div className='row mx-4'>
                                    <div className='col-6' style={{ maxHeight: "calc(100vh - 54px)", overflowY: "auto" }}>
                                        <div className='d-flex justify-content-center' style={{ width: "100%", maxWidth: "200px" }}>
                                            <Image src={produktBild} alt={produktBild} width={200} height={200} className='card'/>
                                        </div>

                                        <p style={{ fontSize: "18px" }}>{ausführlicheBeschreibung}</p>
                                    </div>
                                    <div className='col-6'>
                                        <h1 className='fs-2'>{produktName}</h1>
                                        <p className='fs-4'>{stichWörter}</p>

                                        <p>Verkäufer: {verkäufer}</p>
                                        <p>Preis: {preis ? `${preis}€` : ''}</p>
                                        <p>Lieferzeit: {lieferzeit ? `${lieferzeit} Werktage` : ''}</p>
                                        <p>Vorrat: {vorrat ? `${vorrat} Stück` : ''}</p>

                                        <MagicButton content={"In den Warenkorb"} />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productcreation