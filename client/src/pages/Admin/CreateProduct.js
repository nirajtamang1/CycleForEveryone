import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateProduct() {
  const navigate = useNavigate();
  const [rfid, setRfid] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

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
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("rfid", rfid);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating product");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  htmlFor="photo"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "Upload Photo"}
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </div>
              {photo && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="200px"
                    className="img img-responsive"
                  />
                </div>
              )}
              <input
                type="text"
                value={rfid}
                placeholder="Enter RFID"
                className="form-control mb-3"
                onChange={(e) => setRfid(e.target.value)}
              />
              <input
                type="text"
                value={name}
                placeholder="Enter Product Name"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                value={description}
                placeholder="Enter Product Description"
                className="form-control mb-3"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Enter Price"
                className="form-control mb-3"
                onChange={(e) => setPrice(e.target.value)}
              />

              <button className="btngreenColor" onClick={handleCreate}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
