import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/register", {
        name,
        phone,
        address,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Register-Cycle For Eveyone">
      <div
        className="d-flex justify-content-center align-items-center mx-auto text-center"
        style={{ backgroundColor: "#0bba48", height: "85vh" }}
      >
        <div
          className="login p-5 shadow border text-center"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "30px",
            color: "#555555",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-3 shadow border text-center"
          >
            <h1>Register Page</h1>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="emailHelp"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="form-control"
                id="exampleInputAddress"
                aria-describedby="emailHelp"
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="button btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
