"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from './ui/Input'
import MagicButton from './ui/Button'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guthaben, setGuthaben] = useState("0")
  const [adresse, setAdresse] = useState("null")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert("Alle Inputfelder werden benötigt")
      return
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        alert("Dieser User existiert bereits");
        return;
      }

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, guthaben, adresse
        })
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        router.push("/")
      } else {
        alert("Fehler beim erstellen eines Accounts")
      }
    } catch (error) {
     alert("Fehler beim erstellen eines Accounts: ", error)
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='card form_card'>
        <h1 className='mt-4 mx-4'>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <Input type={"text"} placeholder={"Username"} onChange={(e) => setName(e.target.value)} extraClass={"mt-3 mx-4"} />

          <Input type={"email"} placeholder={"E-Mail"} onChange={(e) => setEmail(e.target.value)} extraClass={"mt-3 mx-4"} />

          <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} extraClass={"mt-3 mx-4"} />
          <div className='mx-4'>
            <MagicButton type={"submit"} content={"Sign Up"} extraClass={"full_width_button mt-3"} />
          </div>

          <div className='mt-3 mb-4 mx-4'>
            <Link href={"/"}>Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
