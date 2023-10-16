// import React from "react"
// import * as yup from "yup"
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import "./Signup.css"
// import { regex } from "../App"
// import { useAuth } from "../utils/auth"
// import bcrypt from "bcryptjs-react"
// import { encryptPassword } from "../utils/helperFunctions"
// import Navbar from "../components/Navbar"

// export const ChangePassword = () => {
//   const schema = yup.object().shape({
//     oldPassword: yup
//       .string()
//       .required()
//       .matches(
//         regex,
//         "Password must contain at least 8 characters, one uppercase, one number and one special case character"
//       ),
//     newPassword: yup
//       .string()
//       .required()
//       .matches(
//         regex,
//         "Password must contain at least 8 characters, one uppercase, one number and one special case character"
//       )
//       .notOneOf(
//         [yup.ref("oldPassword")],
//         "Password should not be same as the old password"
//       ),
//     confirmNewPassword: yup
//       .string()
//       .oneOf([yup.ref("newPassword")], "New passwords doesn't match ")
//       .required(),
//   })

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({ resolver: yupResolver(schema) })

//   const auth = useAuth()

//   const onSubmit = (submittedData) => {
//     console.log(submittedData)
//     console.log(errors)

//     const result = bcrypt.compareSync(
//       submittedData.oldPassword,
//       auth.user.password
//     )

//     if (result) {
//       const allUsers = JSON.parse(localStorage.getItem("users"))

//       const userDetail = allUsers.filter(
//         (user) => user.email === auth.user.email
//       )[0]

//       const userIndex = allUsers.findIndex(
//         (user) => user.email === userDetail.email
//       )
//       const hash = encryptPassword(submittedData.newPassword)

//       allUsers[userIndex].password = hash

//       allUsers[userIndex].confirmPassword = hash

//       localStorage.setItem("users", JSON.stringify(allUsers))
//     }
//   }
//   return (
//     <div>
//       <Navbar />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="input-div">
//           <label htmlFor="oldPassword">Old Password</label>
//           <input
//             type="password"
//             name="oldPassword"
//             id="oldPassword"
//             {...register("oldPassword")}
//           />
//         </div>
//         {errors.oldPassword && (
//           <h4 className="error">{errors.oldPassword.message}</h4>
//         )}
//         <div className="input-div">
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             id="newPassword"
//             {...register("newPassword")}
//           />
//         </div>
//         {errors.newPassword && (
//           <h4 className="error">{errors.newPassword.message}</h4>
//         )}
//         <div className="input-div">
//           <label htmlFor="confirmNewPassword">Confirm New Password</label>
//           <input
//             type="password"
//             name="confirmNewPassword"
//             id="confirmNewPassword"
//             {...register("confirmNewPassword")}
//           />
//         </div>
//         {errors.confirmNewPassword && (
//           <h4 className="error">{errors.confirmNewPassword.message}</h4>
//         )}
//         <div className="submit">
//           <button type="submit">Change Password</button>
//         </div>
//       </form>
//     </div>
//   )
// }

import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "../utils/auth"
import bcrypt from "bcryptjs-react"
import { encryptPassword } from "../utils/helperFunctions"
import Navbar from "../components/Navbar"
import { regex } from "../App"
import { useState } from "react"
import useToast from "../hooks/useToast"

export const ChangePassword = () => {
  const { showToast, toastMessage } = useToast()

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required()
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number, and one special character"
      ),
    newPassword: yup
      .string()
      .required()
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number, and one special character"
      )
      .notOneOf(
        [yup.ref("oldPassword")],
        "Password should not be the same as the old password"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "New passwords don't match")
      .required(),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const auth = useAuth()

  const onSubmit = (submittedData) => {
    const result = bcrypt.compareSync(
      submittedData.oldPassword,
      auth.user.password
    )

    if (result) {
      const allUsers = JSON.parse(localStorage.getItem("users"))
      // const userDetail = allUsers.find((user) => user.email === auth.user.email)
      const userDetail = allUsers.find(
        (user) => user.email === auth.cookies.user.email
      )

      const userIndex = allUsers.findIndex(
        (user) => user.email === userDetail.email
      )
      const hash = encryptPassword(submittedData.newPassword)

      allUsers[userIndex].password = hash
      allUsers[userIndex].confirmPassword = hash

      localStorage.setItem("users", JSON.stringify(allUsers))

      showToast("Password changed successfully!", "success")
    } else {
      showToast("Old Password doesn't match", "danger")
    }
  }

  return (
    <div>
      <Navbar />
      {toastMessage.message && (
        <p className={`alert alert-${toastMessage.type}`}>
          {toastMessage.message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        <div className="mb-3 w-50">
          <label htmlFor="oldPassword" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className="form-control"
            {...register("oldPassword")}
          />
        </div>
        {errors.oldPassword && (
          <div className="alert alert-danger">{errors.oldPassword.message}</div>
        )}

        <div className="mb-3 w-50">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control"
            {...register("newPassword")}
          />
        </div>
        {errors.newPassword && (
          <div className="alert alert-danger">{errors.newPassword.message}</div>
        )}

        <div className="mb-3 w-50">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            className="form-control"
            {...register("confirmNewPassword")}
          />
        </div>
        {errors.confirmNewPassword && (
          <div className="alert alert-danger">
            {errors.confirmNewPassword.message}
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
    </div>
  )
}
