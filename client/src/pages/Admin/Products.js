import Layout from "../../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  //getAll Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Some went wrong to get all the products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product list</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`${process.env.REACT_APP_API_URL}/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title">Rs. {p.price}</h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
