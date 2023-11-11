import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forget-password",
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("Invalid information");
      }
    } catch (error) {
      toast.error("Reset Failed");
    }
  };

  return (
    <Layout title="Forget Password">
      <div>
        <div className="register w-50">
          <h1 className="ml-5">Forget Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputFood"
                aria-describedby="emailHelp"
                placeholder="Enter your Favourite Food"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
