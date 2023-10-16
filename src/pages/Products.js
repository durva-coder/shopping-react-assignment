import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import classes from "./Products.module.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    // fetch all products
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products")

        if (!response.ok) {
          throw new Error("Something went wrong!")
        }

        const responseData = await response.json()
        let data = responseData.products

        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setHttpError(error.message)
      }
    }

    fetchProducts()
  }, [])

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <>
      <Navbar />
      <div className={classes["product-container"]}>
        <h2 className="mt-4 text-center">PRODUCTS</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {currentProducts.map((product) => (
            <div className="mb-4" key={product.id}>
              <Link
                to={`${product.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={classes["card-img-top"]}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{product.title}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">
                      Description: {product.description}
                    </p>
                    <p className="card-text">Brand Name: {product.brand}</p>
                    <p className="card-text">Rating: {product.rating} / 5</p>
                    <p className="card-text">
                      Discount: {product.discountPercentage}%
                    </p>
                    <button className="btn btn-primary mt-auto">
                      Show Product
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(products.length / productsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Products
