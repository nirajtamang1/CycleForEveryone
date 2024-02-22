import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaCircleUser } from "react-icons/fa6";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error("Invalid Information");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <Layout title="Login-Cycle For Everyone">
      <div
        className="d-flex justify-content-center align-items-center mx-auto text-center"
        style={{ backgroundColor: "#0bba48", height: "75vh" }}
      >
        <div
          className="login p-5 shadow border text-center"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "30px",
          }}
        >
          <div className="mb-3">
            <FaCircleUser size={40} style={{ color: "#555555" }} />
          </div>

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
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className=" button mb-2">
              Login
            </button>
            <div>
              <Link
                to="/forgot-password"
                style={{ color: "#555555", marginRight: "10px" }}
              >
                Forget Password
              </Link>
              <Link
                to="/register"
                style={{ color: "#555555", marginLeft: "10px" }}
              >
                Register Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
