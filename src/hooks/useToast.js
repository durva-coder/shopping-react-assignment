import { useState } from "react"

const useToast = () => {
  const [toastMessage, setToastMessage] = useState({
    message: "",
    type: "",
  })

  const showToast = (message, type) => {
    setToastMessage({ message, type })

    setTimeout(() => {
      setToastMessage({
        message: "",
        type: "",
      })
    }, 3000)
  }
  return { showToast, toastMessage }
}

export default useToast
