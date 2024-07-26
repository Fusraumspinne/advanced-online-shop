"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react"

function Orders() {
  const { data: session } = useSession()

  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/getOrders", {
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
        setOrders(data.orders);
      } else {
        console.error("Fehler beim Abrufen der Bestellungen");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen: ", error);
    }
  }

  useEffect(() => {
    setEmail(session?.user?.email)
  }, [session])

  useEffect(() => {
    fetchOrders()
  }, [email])

  useEffect(() => {
    console.log(orders)
  })

  return (
    <div>
      <Navigationbar />

      <div style={{ marginTop: "75px" }}>
        <div className='mx-4'>
          <div className='card px-0' style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
            <table className="table  mb-0">
              <thead>
                <tr>
                  <th scope="col">Bild</th>
                  <th scope="col">Produkt</th>
                  <th scope="col">Anzahl</th>
                  <th scope="col">Lieferzeit</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Bestellt am</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td><Image src={order.productBild} alt={order.productName} width={25} height={25} className='card'/></td>
                    <td><Link href={`/product/${order.product}`}>{order.productName}</Link></td>
                    <td>{order.totalItems}</td>
                    <td>{order.lieferZeit}</td>
                    <td>{order.adresse}</td>
                    <td>{order.datum}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders