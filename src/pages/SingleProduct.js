// import { useParams } from "react-router-dom"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import Navbar from "../components/Navbar"

// const SingleProduct = () => {
//   const param = useParams()
//   let id = param.id
//   const [productDetail, setProductDetails] = useState({})

//   const loadData = async () => {
//     const result = await axios(`https://dummyjson.com/products/${id}`)
//     setProductDetails(result.data)
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   return (
//     <div>
//       <div>
//         <Navbar />

//         <div>{productDetail.title}</div>
//       </div>
//     </div>
//   )
// }

// export default SingleProduct

// import { useParams } from "react-router-dom"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import Navbar from "../components/Navbar"

// const SingleProduct = () => {
//   const param = useParams()
//   let id = param.id
//   const [productDetail, setProductDetails] = useState({})

//   const loadData = async () => {
//     const result = await axios(`https://dummyjson.com/products/${id}`)
//     setProductDetails(result.data)
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   return (
//     <div>
//       <Navbar />
//       <div className="container mt-4">
//         <div className="card">
//           <img
//             src={productDetail.photo}
//             className="card-img-top"
//             alt={productDetail.title}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{productDetail.title}</h5>
//             <p className="card-text">Price: ${productDetail.price}</p>
//             <p className="card-text">Category: {productDetail.category}</p>
//             <p className="card-text">
//               Description: {productDetail.description}
//             </p>
//             <p className="card-text">Brand: {productDetail.brand}</p>
//             <p className="card-text">Rating: {productDetail.rating}</p>
//             <p className="card-text">
//               Discount: {productDetail.discountPercentage}%
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SingleProduct

// import { useParams } from "react-router-dom"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import Navbar from "../components/Navbar"

// const SingleProduct = () => {
//   const param = useParams()
//   let id = param.id
//   const [productDetail, setProductDetails] = useState({})

//   const loadData = async () => {
//     const result = await axios(`https://dummyjson.com/products/${id}`)
//     setProductDetails(result.data)
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   return (
//     <div>
//       <Navbar />
//       <div className="container mt-4">
//         <div className="row">
//           {/* Left half for carousel */}
//           <div className="col-lg-6">
//             <div
//               id="productCarousel"
//               className="carousel slide"
//               data-bs-ride="carousel"
//             >
//               <div className="carousel-inner">
//                 {productDetail.images &&
//                   productDetail.images.map((photo, index) => (
//                     <div
//                       key={index}
//                       className={`carousel-item ${index === 0 ? "active" : ""}`}
//                     >
//                       <img
//                         src={photo}
//                         className="d-block w-100"
//                         alt={`Image ${index}`}
//                       />
//                     </div>
//                   ))}
//               </div>
//               <a
//                 className="carousel-control-prev"
//                 href="#productCarousel"
//                 role="button"
//                 data-bs-slide="prev"
//               >
//                 <span
//                   className="carousel-control-prev-icon"
//                   aria-hidden="true"
//                 ></span>
//                 <span className="visually-hidden">Previous</span>
//               </a>
//               <a
//                 className="carousel-control-next"
//                 href="#productCarousel"
//                 role="button"
//                 data-bs-slide="next"
//               >
//                 <span
//                   className="carousel-control-next-icon"
//                   aria-hidden="true"
//                 ></span>
//                 <span className="visually-hidden">Next</span>
//               </a>
//             </div>
//           </div>

//           {/* Right half for product details */}
//           <div className="col-lg-6">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">{productDetail.title}</h5>
//                 <p className="card-text">Price: ${productDetail.price}</p>
//                 <p className="card-text">Category: {productDetail.category}</p>
//                 <p className="card-text">
//                   Description: {productDetail.description}
//                 </p>
//                 <p className="card-text">Brand: {productDetail.brand}</p>
//                 <p className="card-text">Rating: {productDetail.rating}</p>
//                 <p className="card-text">
//                   Discount: {productDetail.discountPercentage}%
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SingleProduct

import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const SingleProduct = () => {
  const param = useParams()
  let id = param.id
  const [productDetail, setProductDetails] = useState({})

  const loadData = async () => {
    const result = await axios(`https://dummyjson.com/products/${id}`)
    setProductDetails(result.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Left half for carousel taking full height of the screen */}
          <div className="col-lg-6">
            <div
              id="productCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ height: "100vh" }}
            >
              <div className="carousel-inner">
                {productDetail.images &&
                  productDetail.images.map((photo, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={photo}
                        className="d-block w-100 h-100"
                        alt={`Image ${index}`}
                      />
                    </div>
                  ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#productCarousel"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon "
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#productCarousel"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </a>
            </div>
          </div>

          {/* Right half for product details */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{productDetail.title}</h5>
                <p className="card-text">Price: ${productDetail.price}</p>
                <p className="card-text">Category: {productDetail.category}</p>
                <p className="card-text">
                  Description: {productDetail.description}
                </p>
                <p className="card-text">Brand: {productDetail.brand}</p>
                <p className="card-text">Rating: {productDetail.rating}</p>
                <p className="card-text">
                  Discount: {productDetail.discountPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
