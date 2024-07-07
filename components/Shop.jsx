"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

function Shop() {
  const { data: session } = useSession()

  return (
    <div>
      <div>
        <div>
          Name: {session?.user?.name}
        </div>
        <div>
          Email: {session?.user?.email}
        </div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Shop