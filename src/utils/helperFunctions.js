import bcrypt from "bcryptjs-react"

// bcrypt password logic
export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}
