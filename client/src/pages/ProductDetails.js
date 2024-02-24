import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [duration, setDuration] = useState([1]); // Default duration is 1 hour
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [cart, setCart] = useCart();
  const durationOptions = [
    { value: 1, text: "1 hour" },
    { value: 2, text: "2 hours" },
    { value: 3, text: "3 hours" },
    { value: 4, text: "24 hours" },
    { value: 8, text: "2 Days" },
    { value: 12, text: "3 Days" },
    { value: 16, text: "4 Days" },
    { value: 20, text: "5 Days" },
    { value: 24, text: "6 Days" },
    { value: 28, text: "1 week" },
    { value: 56, text: "2 weeks" },
    { value: 84, text: "3 weeks" },
    { value: 112, text: "4 weeks" },
  ];

  // inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      setUpdatedPrice(data?.product.price);
      getSimilarProduct(data?.product?._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  //get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date.toDate());
  };

  const handleDurationChange = (e) => {
    const selectedDuration = parseInt(e.target.value, 10);
    setDuration(selectedDuration);
    // Calculate updated price based on the selected duration
    const updatedPrice = product.price * selectedDuration;
    setUpdatedPrice(updatedPrice);
  };

  const formatDuration = (duration) => {
    if (duration == 1 || duration < 4) {
      return `${duration} hour`;
    } else if (duration <= 4 || duration < 25) {
      const days = duration / 4;
      return `${days} days`;
    } else if (duration >= 28 || duration < 85) {
      const week = duration / 28;
      return `${week} weeks`;
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top mb-3"
              src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">Product Details</h1>
            <h6>
              <strong>Name:</strong> {product.name}
            </h6>
            <h6>
              <strong>Description:</strong> {product.description}
            </h6>
            <h6>
              <strong>Price:</strong> {updatedPrice}
            </h6>
            <h6>
              <strong>Category:</strong> {product?.category?.name}
            </h6>
            <h6>
              <strong>Date and Time:</strong>
            </h6>
            <Datetime
              value={selectedDateTime}
              onChange={handleDateTimeChange}
            />
            <h6>
              <strong>Duration:</strong>
            </h6>
            <select value={duration} onChange={handleDurationChange}>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <button
              className="btngreenColor"
              onClick={() => {
                const updatedProduct = {
                  ...product,
                  price: updatedPrice,
                  duration: formatDuration(duration),
                  selectedDateTime: selectedDateTime.toLocaleString(),
                };
                setCart([...cart, updatedProduct]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, updatedProduct])
                );
                toast.success("Item added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr />
        <h4 className="mt-4">Similar Products</h4>
        <div className="row">
          {relatedProducts.length < 1 && <p>No similar products found</p>}
          {relatedProducts?.map((p) => (
            <div className="col-md-3" key={p._id}>
              <div className="card mb-3">
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 50)}</p>
                  <p className="card-text">Rs. {p.price}</p>
                  <button
                    className="cartbtn  ms-1 w-100"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
