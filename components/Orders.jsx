"use client"

import React from 'react'
import Navigationbar from './ui/Navbar'
import Link from 'next/link'
import Image from 'next/image'

function Orders() {
  return (
    <div>
      <Navigationbar />

      <div style={{ marginTop: "75px" }}>
        <div className='mx-4'>
          <div className='card px-0' style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
            <table className="table">
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
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders