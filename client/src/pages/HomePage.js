import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some went wrong to getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Some went wrong to get all the products");
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get Filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {}
  };
  return (
    <div className="row mt-3 mb-3" style={{ backgroundColor: "#0bba48" }}>
      <div className="col-md-3 border" style={{ backgroundColor: "#0bba48" }}>
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column">
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* Price Filter  */}
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <button
          className="btn btn-danger mt-3"
          style={{ backgroundColor: "red" }}
          onClick={() => window.location.reload()}
        >
          Reset Filters
        </button>
      </div>
      <div className="col-md-9" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div
              className="card m-3 shadow"
              style={{ width: "18rem" }}
              key={p._id}
            >
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                style={{ height: "150px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Rs. {p.price}</p>
                <button
                  className="cartbtn ms-1 w-100"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading.. " : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
