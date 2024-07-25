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
  const [error, setError] = useState("");

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError("Alle Inputfelder werden benötigt")
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
        setError("Dieser User existiert bereits");
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
        console.log("Fehler beim erstellen eines Accounts")
      }
    } catch (error) {
      console.log("Fehler beim erstellen eines Accounts: ", error)
    }
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <Input type={"text"} placeholder={"Username"} onChange={(e) => setName(e.target.value)} />

          <Input type={"email"} placeholder={"E-Mail"} onChange={(e) => setEmail(e.target.value)} />

          <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />

          <MagicButton type={"submit"} content={"Sign Up"} />

          {error && <div>{error}</div>}

          <Link href={"/"}>Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
