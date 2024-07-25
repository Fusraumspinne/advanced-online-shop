"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from './ui/Input'
import MagicButton from './ui/Button'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Alle Inputfelder werden benötigt")
      return
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (res.error) {
        alert("Falsche Logindaten")
        return
      }

      router.replace("shop")
    } catch (error) {
      alert("Ein Fehler ist aufgetreten: " + error)
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='card form_card'>
        <h1 className='mt-4 mx-4'>Login</h1>

        <form onSubmit={handleSubmit}>
          <Input type={"email"} placeholder={"E-Mail"} onChange={(e) => setEmail(e.target.value)} extraClass={"mt-3 mx-4"} />

          <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} extraClass={"mt-3 mx-4"} />

          <div className='mx-4'>
            <MagicButton type={"submit"} content={"Login"} extraClass={"full_width_button mt-3"} />
          </div>

          <div className='mt-3 mb-4 mx-4'>
            <Link href={"/signup"}>{`Don't have an account? Sign Up`}</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login