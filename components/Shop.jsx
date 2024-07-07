"use client"

import { useSession } from "next-auth/react"
import Navbar from "./ui/Navbar"

function Shop() {
  const { data: session } = useSession()

  return (
    <div>
      <Navbar/>
      <div>
        
      </div>
    </div>
  )
}

export default Shop