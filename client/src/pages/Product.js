import React from "react";
import Layout from "../components/Layout/Layout";
import HomePage from "./HomePage";

function Product() {
  return (
    <Layout>
      <div className="container">
        <div className="py-5 text-center">
          <h1 className="display-4 mb-4">Discover Our Products</h1>
          <p className="lead">
            Explore our wide range of high-quality products and find the perfect
            one for you.
          </p>
        </div>
        <HomePage />
      </div>
    </Layout>
  );
}

export default Product;
