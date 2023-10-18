import { useAuth } from "../utils/auth"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import Navbar from "../components/Navbar"
import useToast from "../hooks/useToast"
import { messages } from "../config/messages"

const Profile = () => {
  const auth = useAuth()

  const { showToast, toastMessage } = useToast()

  const loggedInUser = auth.cookies.user
  // const loggedInUser = auth.user

  const allUsers = JSON.parse(localStorage.getItem("users"))

  // finding the current loggedIn user
  const userDetail = allUsers?.filter((user) => {
    return loggedInUser.email === user.email
  })
  const data = userDetail[0]
  const [userData, setUserData] = useState(data)

  // onchange logic
  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const onSubmit = (submittedData) => {
    // finding the index of current loggedIn user
    const userIndex = allUsers.findIndex((user) => user.email === data?.email)

    // check if the updated email is already exists
    const emailExists = allUsers?.filter(
      (user) => user.email === submittedData.email
    )

    // if email exists
    if (emailExists.length > 0 && submittedData.email !== data?.email) {
      showToast(messages.emailExists, "danger")
    } else {
      // else update the user detail at particular index
      if (userIndex !== -1) {
        allUsers[userIndex] = { ...data, ...submittedData }
        localStorage.setItem("users", JSON.stringify(allUsers))

        showToast(messages.profileUpdate, "success")
      } else {
        showToast(messages.userNotFound, "danger")
      }
    }
  }

  // yup validation
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobileNumber: yup.string().min(10).max(10).required(),
    email: yup.string().email().required(),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {toastMessage.message && (
          <p className={`alert alert-${toastMessage.type}`}>
            {toastMessage.message}
          </p>
        )}

        <div className="container mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
            <h3 className="text-center mb-4">Edit Profile</h3>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                onChange={handleFieldChange}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName.message}</p>
              )}
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
                defaultValue={data?.lastName}
                onChange={handleFieldChange}
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                className="form-control"
                type="number"
                placeholder="Mobile Number"
                name="mobileNumber"
                {...register("mobileNumber")}
                defaultValue={data?.mobileNumber}
                onChange={handleFieldChange}
              />
              {errors.mobileNumber && (
                <p className="text-danger">{errors.mobileNumber.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email")}
                defaultValue={data?.email}
                onChange={handleFieldChange}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            <div>
              <button type="submit" className="btn btn-primary me-3">
                Save
              </button>
              <Link to="/changepassword" className="btn btn-secondary">
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile
