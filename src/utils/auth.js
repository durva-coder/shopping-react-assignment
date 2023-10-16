import { useContext } from "react"
import { useState, createContext } from "react"
import { useCookies } from "react-cookie"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cookies, setCookies, removeCookie] = useCookies(["user"])

  const signup = (user) => {
    setUser(user)
    setCookies("user", user)
  }

  const login = (user) => {
    setUser(user)
    setCookies("user", user, { path: "/" })
  }

  const logout = () => {
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
