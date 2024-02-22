import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/reset_password/${id}/${token}`,
        { password }
      );
      console.log(res);
      if (res.data.Status === "Successs") {
        toast.success("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center mx-auto "
        style={{ backgroundColor: "#0bba48", height: "75vh" }}
      >
        <div
          className="login shadow border"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "30px",
            color: "#555555",
          }}
        >
          <h4 className="pb-2">Reset Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button w-100 rounded-0">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default ResetPassword;
