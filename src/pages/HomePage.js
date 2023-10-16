import React from "react"
import Navbar from "../components/Navbar"
import { useAuth } from "../utils/auth"
import LoginPage from "./LoginPage"

export default function HomePage() {
  const auth = useAuth()

  return (
    <div>
      {/* {auth.user && <Navbar />}
      {!auth.user && <LoginPage />} */}
      {auth.cookies.user && <Navbar />}
      {!auth.cookies.user && <LoginPage />}
    </div>
  )
}
