import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Banner from "../components/Layout/Banner";
import Aboutus from "../components/Layout/Aboutus";
import Contactus from "../components/Layout/Contactus";

function Home() {
  const navigate = useNavigate();
  const productCards = [];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    productCards.push(
      <div className="card m-3 shadow" style={{ width: "18rem" }} key={p._id}>
        <img
          className="card-img-top"
          src={`/api/v1/product/product-photo/${p._id}`}
          alt={p.name}
          style={{ height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description.substring(0, 20)}</p>
          <p className="card-text">Rs. {p.price}</p>
          <button
            className="cartbtn ms-1 w-100"
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            View More
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout title={"Home Page-Cycle Booking System"}>
      <div className="container">
        <Banner />
        <section>
          <div className="pt-5">
            <h4 className="producttitle">OUR Product</h4>
            <h3>Featured Products</h3>
            <p>
              Made for riders 16 years old and up, it’s powered by a rear-hub
              motor and features a thumb throttle and pedal-assisted support
              making it a Class 3 e-bike.
            </p>
          </div>
          <div className="d-flex flex-wrap">{productCards}</div>
        </section>
        <Aboutus />
        <Contactus />
      </div>
    </Layout>
  );
}

export default Home;
