import { useContext } from "react"
import { useState, createContext } from "react"
import { useCookies } from "react-cookie"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cookies, setCookies, removeCookie] = useCookies(["user"])

  const signup = (user) => {
    // after signup set cookie
    setUser(user)
    setCookies("user", user)
  }

  const login = (user) => {
    // after login set cookie
    setUser(user)
    setCookies("user", user, { path: "/" })
  }

  const logout = () => {
    // after logout remove cookie
    setUser(null)
    removeCookie("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, cookies }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
