// import React, { useState } from "react"
// import * as yup from "yup"
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { Link } from "react-router-dom"
// import "./Signup.css"
// import { regex } from "../App"
// import { encryptPassword } from "../utils/helperFunctions"

// export default function SignupPage() {
//   // const [users, setUsers] = useState([])
//   const [successMessage, setSuccessMessage] = useState("")
//   const [error, setError] = useState(false)

//   let userData = ""

//   const onSubmit = (submittedData) => {
//     const hash = encryptPassword(submittedData.password)

//     submittedData.password = hash
//     submittedData.confirmPassword = hash

//     let users = JSON.parse(localStorage.getItem("users") || "[]")

//     // Check If the User is Already Registered or Not
//     userData = users?.filter((user) => {
//       return user.email === submittedData.email
//     })

//     console.log("userdata", userData.length)
//     if (userData.length > 0) {
//       // return
//       setError(true)

//       setTimeout(() => {
//         setError(false)
//       }, 5000)
//     } else {
//       // const newUser = { ...submittedData }
//       // setUsers((prevUsers) => [...prevUsers, newUser])
//       // localStorage.setItem("currentSignUpUser", JSON.stringify(submittedData))

//       users.push(submittedData)
//       localStorage.setItem("users", JSON.stringify(users))
//       setSuccessMessage("Signup successful!")

//       // Clear the success message after 5 seconds (5000 milliseconds)
//       setTimeout(() => {
//         setSuccessMessage("")
//       }, 5000)
//     }

//     // let users = JSON.parse(localStorage.getItem("users") || "[]")
//     // users.push(submittedData)
//     // localStorage.setItem("users", JSON.stringify(users))
//   }

//   // useEffect(() => {
//   //   localStorage.setItem("users", JSON.stringify(users))
//   // }, [users])

//   const schema = yup.object().shape({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     mobileNumber: yup.string().min(10).max(10).required(),
//     email: yup.string().email().required(),
//     password: yup
//       .string()
//       .required()
//       .max(32)
//       .min(8)
//       .matches(
//         regex,
//         "Password must contain at least 8 characters, one uppercase, one number and one special case character"
//       ),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match")
//       .required(),
//   })

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) })

//   return (
//     <div className="container h-100">
//       {error && <p>User Already Exists.</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <div class="row align-items-center" style={{ height: "100vh" }}>
//         <div class="mx-auto col-10 col-md-8 col-lg-6">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             // className="signupForm"
//           >
//             <h3 className="text-center mb-4">Signup Form</h3>

//             <div className="row">
//               <div className="w-25 mb-3">
//                 <label htmlFor="firstName" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   placeholder="First Name"
//                   {...register("firstName")}
//                   name="firstName"
//                 />
//                 <div className="form-text">
//                   {errors.firstName && <>{errors.firstName.message}</>}
//                 </div>
//               </div>

//               <div className="w-25 mb-3">
//                 <label htmlFor="lastName" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   placeholder="Last Name"
//                   name="lastName"
//                   {...register("lastName")}
//                 />
//               </div>

//               <div className="form-text">
//                 {errors.lastName && <>{errors.lastName.message}</>}
//               </div>
//             </div>

//             <div className="row">
//               <div className="w-25 mb-3">
//                 <label htmlFor="mobileNumber" className="form-label">
//                   Mobile Number
//                 </label>
//                 <input
//                   className="form-control"
//                   type="number"
//                   placeholder="Mobile Number"
//                   name="mobileNumber"
//                   {...register("mobileNumber")}
//                 />

//                 <div className="form-text">
//                   {errors.mobileNumber && <>{errors.mobileNumber.message}</>}
//                 </div>
//               </div>

//               <div className="w-25 mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email
//                 </label>
//                 <input
//                   className="form-control"
//                   type="email"
//                   placeholder="Email"
//                   name="email"
//                   {...register("email")}
//                 />
//                 <div className="form-text">
//                   {errors.email && <>{errors.email.message}</>}
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="w-25 mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   className="form-control"
//                   type="password"
//                   placeholder="Password"
//                   name="password"
//                   {...register("password")}
//                 />
//                 <div className="form-text">
//                   {errors.password && <>{errors.password.message}</>}
//                 </div>
//               </div>

//               <div className="w-25 mb-3">
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Confirm Password
//                 </label>
//                 <input
//                   className="form-control"
//                   type="password"
//                   placeholder="Confirm Password"
//                   name="confirmPassword"
//                   {...register("confirmPassword")}
//                 />
//                 <div className="form-text">
//                   {errors.confirmPassword && (
//                     <>{errors.confirmPassword.message}</>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <button type="submit" className="btn btn-primary me-3">
//                 SignUp
//               </button>
//               {console.log("errors : ", errors)}
//               <Link to="/login" className="me-3">
//                 Already have an account?
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// import React from "react"
// import { Link } from "react-router-dom"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"
// import bcrypt from "bcryptjs-react"
// import { useState } from "react"

// import "./Signup.css"
// import { useAuth } from "../utils/auth"
// import { regex } from "../App"

// export default function SignupPage() {
//   const navigate = useNavigate()
//   const [error, setError] = useState("")
//   const auth = useAuth()

//   const schema = yup.object().shape({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     mobileNumber: yup
//       .string()
//       .matches(/^[0-9]{10}$/, "Mobile Number should be 10 digits")
//       .required("Mobile Number is required"),
//     email: yup.string().email().required("Email is required"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .max(32, "Password should be at most 32 characters")
//       .min(8, "Password should be at least 8 characters")
//       .matches(regex, "Password should meet requirements"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   })

//   const onSubmit = (submittedData) => {
//     console.log(submittedData)
//     // Add your signup logic here.
//   }

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) })

// }

import React, { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
import "./Signup.css"
import { regex } from "../App"
import { encryptPassword } from "../utils/helperFunctions"
import useToast from "../hooks/useToast"
import { useAuth } from "../utils/auth"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  // const [users, setUsers] = useState([])
  const auth = useAuth()
  const { showToast, toastMessage } = useToast()
  const navigate = useNavigate()

  let userData = ""

  const onSubmit = (submittedData) => {
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
      // const newUser = { ...submittedData }
      // setUsers((prevUsers) => [...prevUsers, newUser])
      // localStorage.setItem("currentSignUpUser", JSON.stringify(submittedData))

      users.push(submittedData)
      localStorage.setItem("users", JSON.stringify(users))

      auth.signup(submittedData)

      showToast("Signup Successful", "success")
      setTimeout(() => {
        navigate("/products", { replace: true })
      }, 1000)
    }

    // let users = JSON.parse(localStorage.getItem("users") || "[]")
    // users.push(submittedData)
    // localStorage.setItem("users", JSON.stringify(users))
  }

  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users))
  // }, [users])

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
