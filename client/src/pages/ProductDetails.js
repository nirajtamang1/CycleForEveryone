import React, { useState, useEffect, PureComponent } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);

  // inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {}
  };

  //get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      console.log(pid, cid);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {/* {JSON.stringify(product, null, 4)} */}
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top"
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height="300"
            width="300"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:{product.price}</h6>
          <h6>Category:{product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row">
        <h6>Similar Product </h6>
        {relatedProducts.length < 1 && <p>No similar product is found</p>}
        {/* {JSON.stringify(relatedProducts, null, 4)} */}
        {relatedProducts?.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description.substring(0, 20)}</p>
              <p className="card-text">Rs. {p.price}</p>
              <button className="btn btn-secondary ms-1">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProductDetails;
