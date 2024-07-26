"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import Image from 'next/image'
import MagicButton from './ui/Button'
import { useSession } from "next-auth/react"
import Input from './ui/Input'
import { useRouter } from 'next/navigation'

function Product({ params }) {
  const { data: session } = useSession()

  const router = useRouter()

  const [productObject, setProductObject] = useState([])

  const [email, setEmail] = useState("")
  const [produkt, setProdukt] = useState("")
  const [anzahl, setAnzahl] = useState()
  const [preis, setPreis] = useState("")
  const [produktName, setProduktName] = useState("")
  const [lieferzeit, setLieferzeit] = useState("")
  const [produktBild, setProduktBild] = useState("")

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/getProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: params.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setProductObject(data.product);
      } else {
        console.error("Fehler beim Abrufen des Produktes");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Produktes: ", error);
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    setEmail(session?.user?.email)
    setProdukt(params.id)
    setPreis(productObject.preis)
    setProduktName(productObject.produktName)
    setLieferzeit(productObject.lieferzeit)
    setProduktBild(productObject.produktBild)

  }, [session, productObject, params])

  const addWarenkorb = async () => {
    if (!email || !produkt || !anzahl || !preis || !produktName || !lieferzeit || !produktBild) {
      console.log("Alle Inputfelder werden benötigt")
      return
    }

    try {
      const res = await fetch("/api/addWarenkorb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          produkt,
          anzahl,
          preis,
          produktName,
          lieferzeit,
          produktBild
        })
      })

      if (res.ok) {
        console.log("Produkt wurde zum Warenkorb hinzugefügt")

        router.push("/warenkorb")
      } else {
        console.log("Fehler beim hinzufügen des Produktes in den Warenkorb")
      }
    } catch (error) {
      console.log("Fehler beim hinzufügen des Produktes in den Warenkorb: ", error)
    }
  }

  return (
    <div>
      <Navigationbar />
      <div className='card mx-3' style={{ marginTop: "75px" }}>
        <div className='row mx-4 mt-3'>
          <div className='col-6' style={{ maxHeight: "calc(100vh - 54px)", overflowY: "auto" }}>
            <div className='d-flex justify-content-center mb-3'>
              <Image src={productObject.produktBild} alt={productObject.produktBild} width={500} height={500} className='card'/>
            </div>

            <p style={{ fontSize: "18px" }}>{productObject.ausführlicheBeschreibung}</p>
          </div>
          <div className='col-6'>
            <h1 className='fs-2'>{productObject.produktName}</h1>
            <p className='fs-4'>{productObject.stichWörter}</p>

            <p>Verkäufer: {productObject.verkäufer}</p>
            <p>Preis: {productObject.preis}€</p>
            <p>Lieferzeit: {productObject.lieferzeit} Werktage</p>

            <Input extraClass={"mb-3"} type={"number"} placeholder={"Anzahl"} onChange={(e) => setAnzahl(e.target.value)}/>

            <MagicButton content={"In den Warenkorb"} funktion={addWarenkorb} extraClass={"full_width_button"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product