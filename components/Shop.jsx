"use client"

import Navigationbar from "./ui/Navbar"
import { useEffect, useState } from "react"
import Image from 'next/image';
import Productcard from "./ui/Productcard";

function Shop() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/getProducts", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Fehler beim Abrufen der Produkte:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Produkte:", error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div>
      <Navigationbar />
      <div className="d-flex justify-content-center">
        <div className="product_container" style={{ marginTop: "75px" }}>
          {products.map((product) => (
            <div key={product._id}>
              <Productcard
                produktname={product.produktName}
                preis={product.preis}
                stichwörter={product.stichWörter}
                produktbild={product.produktBild}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Shop