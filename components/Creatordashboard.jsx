"use client"

import React from 'react'
import Navigationbar from "./ui/Navbar"
import MagicButton from './ui/Button'
import { useRouter } from 'next/navigation'

function Creatordashboard() {
  const router = useRouter()

  const createProduct = () => {
    router.replace("productcreation")
  }

  return (
    <div>
        <Navigationbar/>

        <div style={{marginTop: "75px"}}>
          <MagicButton content={"Create Product"} funktion={createProduct}/>
        </div>
    </div>
  )
}

export default Creatordashboard