"use client"

import Navigationbar from "./ui/Navbar"
import { useEffect, useState } from "react"
import Productcard from "./ui/Productcard";
import Link from "next/link";
import React from "react";

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
        console.error("Fehler beim Abrufen der Produkte");
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
              <Link className="text-decoration-none" href={`/product/${product._id}`}>
                <Productcard
                  produktname={product.produktName}
                  preis={product.preis}
                  stichwörter={product.stichWörter}
                  produktbild={product.produktBild}
                  extraClass={"mt-4"}
                />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Shop