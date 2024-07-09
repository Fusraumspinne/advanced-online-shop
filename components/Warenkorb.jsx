"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete';

function Warenkorb() {
  const { data: session } = useSession()

  const [email, setEmail] = useState("")
  const [warenkorb, setWarenkorb] = useState([])

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
                    <td>{item.preis}</td>
                    <td><DeleteIcon/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-4'>
            <form onSubmit={handleSubmit}>
              <MagicButton content={"Bezahlen"} type={"submit"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warenkorb