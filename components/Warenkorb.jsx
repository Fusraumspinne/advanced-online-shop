"use client"

import React, { useState, useEffect, use } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete';
import Input from './ui/Input'

function Warenkorb() {
  const { data: session } = useSession()

  const [email, setEmail] = useState("")
  const [warenkorb, setWarenkorb] = useState([])
  const [adresse, setAdresse] = useState("")

  const [productPrice, setProductPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [lieferKosten, setLieferKosten] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const fetchWarenkorb = async () => {
    try {
      const response = await fetch("/api/getWarenkorb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      if (response.ok) {
        const data = await response.json();
        setWarenkorb(data.warenkorb);
      } else {
        console.error("Fehler beim Abrufen des Produktes:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Produktes:", error);
    }
  }

  useEffect(() => {
    setEmail(session?.user?.email)
  }, [session])

  useEffect(() => {
    fetchWarenkorb()
  }, [email])

  useEffect(() => {
    console.log(warenkorb)
  }, [warenkorb])

  useEffect(() => {
    const total = warenkorb.reduce((acc, item) => {
      const formattedPrice = parseFloat(item.preis.replace(/\./g, '').replace(',', '.'));
      return {
        price: acc.price + (formattedPrice * item.anzahl),
        items: acc.items + item.anzahl
      }
    }, { price: 0, items: 0 });

    setProductPrice(total.price);
    setTotalItems(total.items);

    setLieferKosten(total.items * 4)

    setTotalPrice(total.items * 4 + total.price)
  }, [warenkorb])

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch("/api/deleteWarenkorbItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: itemId
        })
      });

      if (response.ok) {
        setWarenkorb(warenkorb.filter(item => item._id !== itemId));
      } else {
        console.error("Fehler beim Abrufen des Produktes:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Produktes:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <Navigationbar />

      <div style={{ marginTop: "56px" }}>
        <div className='row mx-4'>
          <div className='col-8' style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Bild</th>
                  <th scope="col">Produkt</th>
                  <th scope="col">Anzahl</th>
                  <th scope="col">Preis</th>
                  <th scope="col">Löschen</th>
                </tr>
              </thead>
              <tbody>
                {warenkorb.map((item) => (
                  <tr key={item._id}>
                    <td><Image src={item.produktBild} alt={item.produktName} width={25} height={25} /></td>
                    <td><Link href={`/product/${item.produkt}`}>{item.produktName}</Link></td>
                    <td>{item.anzahl}</td>
                    <td>{item.preis ? `${item.preis}€` : ''}</td>
                    <td><DeleteIcon onClick={() => handleDelete(item._id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-4'>
            <form onSubmit={handleSubmit}>
              <p>Produktepreis: {productPrice ? productPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>
              <p>Anzahl: {totalItems ? `${totalItems} Produkte` : '0 Produkte'}</p>
              <p>Lieferkosten: {lieferKosten ? lieferKosten.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>
              <p>Gesamtpreis: {totalPrice ? totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>

              <Input isLabel={true} contentLabel={"Adresse"} placeholder={"Bülserstraße 80"} onChange={(e) => setAdresse(e.target.value)} />

              <MagicButton content={"Bezahlen"} type={"submit"} extraClass={"full_width_button mt-3"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warenkorb