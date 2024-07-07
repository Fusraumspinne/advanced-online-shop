"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if(res.error){
        setError("Invalid Logininformations")
        return
      }

      router.replace("shop")
    } catch (error) {

    }
  }

  return (
    <div>
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>

          {error && <div>{error}</div>}

          <Link href={"/signup"}>Don't have an account? Sign Up</Link>
        </form>
      </div>
    </div>
  )
}

export default Login