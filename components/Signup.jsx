"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !email || !password) {
      setError("All fields are necessary")
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
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, email, password
        })
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        router.push("/")
      } else {
        console.log("User registration failed")
      }
    } catch (error) {
      console.log("Error during regsitration: ", error)
    }
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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

          <button>Sign Up</button>

          {error && <div>{error}</div>}

          <Link href={"/"}>Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
