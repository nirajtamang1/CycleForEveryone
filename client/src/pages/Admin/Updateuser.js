import Layout from "../../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";

function Updateuser() {
  //context
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  //get user data
  useEffect(() => {
    getUserData(id);
  }, []);
  const getUserData = async (id) => {
    let userinfo = await axios.get(`/api/v1/user/get-user/${id}`);
    setData(userinfo.data[0]);
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/v1/user/update-user/${id}`, data);
    navigate("/dashboard/admin/users");
  };
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Update User</h1>
            <form onSubmit={handleSubmit}>
              {/* <form> */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={onChange}
                  className="form-control"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={onChange}
                  className="form-control"
                  id="exampleInputAddress"
                  aria-describedby="emailHelp"
                  placeholder="Enter your address"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Updateuser;
