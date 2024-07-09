"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import Image from 'next/image'
import MagicButton from './ui/Button'

function Product({ params }) {
  const [product, setProduct] = useState([])

  const fetchProducts = async () => {
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
        setProduct(data.product);
      } else {
        console.error("Fehler beim Abrufen des Produktes:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Produktes:", error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <Navigationbar />
      <div style={{ marginTop: "75px" }}>
        <div className='row mx-4'>
          <div className='col-6' style={{ maxHeight: "calc(100vh - 54px)", overflowY: "auto" }}>
            <div className='d-flex justify-content-center'>
              <Image src={product.produktBild} alt={product.produktBild} width={500} height={500}/>
            </div>

            <p style={{fontSize: "18px"}}>{product.ausführlicheBeschreibung}</p>
          </div>
          <div className='col-6'>
            <h1 className='fs-2'>{product.produktName}</h1>
            <p className='fs-4'>{product.stichWörter}</p>

            <p>Verkäufer: {product.verkäufer}</p>
            <p>Preis: {product.preis}€</p>
            <p>Lieferzeit: {product.lieferzeit} Werktage</p>
            <p>Vorrat: {product.vorrat} Stück</p>

            <MagicButton content={"In den Warenkorb"}/>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Product