import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import "./App.module.css"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import Products from "./pages/Products"
import { AuthProvider } from "./utils/auth"
import RequireAuth from "./components/RequireAuth"
import SingleProduct from "./pages/SingleProduct"
import { ChangePassword } from "./pages/ChangePassword"
import ErrorPage from "./pages/ErrorPage"
import { CookiesProvider } from "react-cookie"

export const regex =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/products"
                element={
                  <RequireAuth>
                    <Products />
                  </RequireAuth>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <RequireAuth>
                    <SingleProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="/changepassword"
                element={
                  <RequireAuth>
                    <ChangePassword />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </Router>
        </div>
      </CookiesProvider>
    </AuthProvider>
  )
}

export default App
