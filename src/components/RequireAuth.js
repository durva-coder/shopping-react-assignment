import { useAuth } from "../utils/auth"
import { Navigate } from "react-router-dom"

const RequireAuth = ({ children }) => {
  const auth = useAuth()

  // if (!auth.user) {
  //   return <Navigate to="/login" />
  // }

  if (!auth.cookies.user) {
    return <Navigate to="/login" />
  }

  return children
}

export default RequireAuth
