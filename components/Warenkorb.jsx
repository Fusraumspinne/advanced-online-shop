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

  const [user, setUser] = useState()

  const [email, setEmail] = useState("")
  const [warenkorb, setWarenkorb] = useState([])
  const [guthaben, setGuthaben] = useState(0)
  const [formattedGuthaben, setFormattedGuthaben] = useState(0)
  const [adresse, setAdresse] = useState("")

  const [productPrice, setProductPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [lieferKosten, setLieferKosten] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [error, setError] = useState("")


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
        console.error("Fehler beim Abrufen des Warenkorbes");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Warenkorbes: ", error);
    }
  }

  const fetchPayment = async () => {
    try {
      const response = await fetch("/api/getPayment", {
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
        setUser(data.user);
      } else {
        console.error("Fehler beim Abrufen der Paymentdaten");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Paymentdaten: ", error);
    }
  }

  useEffect(() => {
    setEmail(session?.user?.email)
  }, [session])

  useEffect(() => {
    fetchWarenkorb()
    fetchPayment()
  }, [email])

  useEffect(() => {
    if (user && user.adresse && user.adresse !== "null") {
      setAdresse(user.adresse);
    } else {
      setAdresse('');
    }

    if (user && user.guthaben) {
      const formattedGuthaben = parseFloat(user.guthaben.replace(/\./g, '').replace(',', '.'));
      setFormattedGuthaben(formattedGuthaben)
      setGuthaben(parseInt(user.guthaben));
    }
  }, [user]);

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
        console.error("Fehler beim Löschen eines Produktes aus dem Warenkorb");
      }
    } catch (error) {
      console.error("Fehler beim Löschen eines Produktes aus dem Warenkorb: ", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (adresse === "") {
      setError("Keine Adresse angegeben");
      return;
    } else {
      if (formattedGuthaben < totalPrice) {
        setError("Guthaben ist kleiner als der Endgültigepreis");
        return;
      }
    }

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          adresse,
          productPrice,
          totalItems,
          lieferKosten,
          totalPrice,
          warenkorb
        })
      });

      if (res.ok) {
        console.log("Bestellung erstellt");

        handlePayment()
        handleClear()
      } else {
        console.log("Fehler beim erstelle der Bestellung");
      }
    } catch (error) {
      console.log("Fehler beim erstelle der Bestellung: ", error);
    }
  };

  const handlePayment = async () => {
    const newGuthaben = guthaben - totalPrice;

    try {
      const guthabenString = newGuthaben.toString().replace('.', ',');
      console.log(guthabenString);

      const response = await fetch("/api/updatePayment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          guthaben: guthabenString,
          adresse
        }),
      });

      if (response.ok) {
        console.log("Bezahlung war erfolgreich");

        setGuthaben(newGuthaben);

        const newFormattedGuthaben = parseFloat(newGuthaben.toString().replace(/\./g, '').replace(',', '.'));
        setFormattedGuthaben(newFormattedGuthaben)
      } else {
        console.error("Fehler bei der Bezahlung");
      }
    } catch (error) {
      console.error("Fehler bei der Bezahlung: ", error);
    }
  }

  const handleClear = async () => {
    try {
      const response = await fetch("/api/clearWarenkorb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      if (response.ok) {
        setWarenkorb([]);
        console.log("Alle Produkte aus dem Warenkorb wurden gelöscht.");
      } else {
        console.error("Fehler beim Löschen der Produkte aus dem Warenkorb");
      }
    } catch (error) {
      console.error("Fehler beim Löschen der Produkte aus dem Warenkorb: ", error);
    }
  }

  return (
    <div>
      <Navigationbar />

      <div style={{ marginTop: "75px" }}>
        <div className='row mx-4'>
          <div className='col-8 card px-0' style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
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
                    <td><DeleteIcon className='curser_pointer' onClick={() => handleDelete(item._id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-4'>
            <form onSubmit={handleSubmit}>
              <p className='fs-5'>Bestellbeschreibung</p>

              <p>Produktepreis: {productPrice ? productPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>
              <p>Anzahl: {totalItems ? `${totalItems} Produkte` : '0 Produkte'}</p>
              <p>Lieferkosten: {lieferKosten ? lieferKosten.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>
              <p>Gesamtpreis: {totalPrice ? totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>

              <p className='fs-5'>aktuelles Guthaben</p>

              <p>{formattedGuthaben ? formattedGuthaben.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '0,00€'}</p>

              <Input isLabel={true} contentLabel={"Adresse"} placeholder={"Bülserstraße 80"} onChange={(e) => setAdresse(e.target.value)} value={adresse} />

              <MagicButton content={"Bezahlen"} type={"submit"} extraClass={"full_width_button mt-3"} />
            </form>
          </div>
        </div>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Warenkorb