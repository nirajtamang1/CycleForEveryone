import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Hello eveyone");
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/auth/forget-password",
        { email }
      );
      toast.success("Please check your mail for reset password link!");
      navigate("/login");
    } catch (error) {
      toast.error("Reset Failed");
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ backgroundColor: "#0bba48", height: "75vh", color: "#555555" }}
      >
        <div className="bg-white p-3 rounded w-40">
          <h4>Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="pt-4 mb-3">
              <label htmlFor="email" className="pb-2">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="button mb-2 w-100">
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
