"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import Image from 'next/image'

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
      <div style={{ marginTop: "56px" }}>
        <div className='row mx-4'>
          <div className='col-6' style={{ maxHeight: "calc(100vh - 54px)", overflowY: "auto" }}>
            <Image src={product.produktBild} alt={product.produktBild} width={400} height={400}/>
          </div>
          <div className='col-6 d-flex justify-content-center align-items-center'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product