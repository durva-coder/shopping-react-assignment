import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"

import { regex } from "../App"
import { encryptPassword } from "../utils/helperFunctions"
import useToast from "../hooks/useToast"
import { useAuth } from "../utils/auth"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  const auth = useAuth()
  const { showToast, toastMessage } = useToast()
  const navigate = useNavigate()

  let userData = ""

  const onSubmit = (submittedData) => {
    // hashing the password
    const hash = encryptPassword(submittedData.password)

    submittedData.password = hash
    submittedData.confirmPassword = hash

    let users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check If the User is Already Registered or Not
    userData = users?.filter((user) => {
      return user.email === submittedData.email
    })

    if (userData.length > 0) {
      showToast("User Already Exists", "danger")
    } else {
      // store the user in localstorage
      users.push(submittedData)
      localStorage.setItem("users", JSON.stringify(users))

      auth.signup(submittedData)

      showToast("Signup Successful", "success")
      setTimeout(() => {
        navigate("/products", { replace: true })
      }, 1000)
    }
  }

  // yup validation
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobileNumber: yup.string().min(10).max(10).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .max(32)
      .min(8)
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div className="container h-100">
      {toastMessage.message && (
        <p className={`alert alert-${toastMessage.type}`}>
          {toastMessage.message}
        </p>
      )}

      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border rounded bg-white"
          >
            <h3 className="text-center mb-4">Signup Form</h3>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                name="firstName"
                {...register("firstName")}
              />
              <div className="form-text">
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                name="lastName"
                {...register("lastName")}
              />
              <div className="form-text">
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                {...register("mobileNumber")}
              />
              <div className="form-text">
                {errors.mobileNumber && (
                  <p className="text-danger">{errors.mobileNumber.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <div className="form-text">
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                {...register("password")}
              />
              <div className="form-text">
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              <div className="form-text">
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
            <div className="text-center">
              Already have an account? <Link to="/login">Login Here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
