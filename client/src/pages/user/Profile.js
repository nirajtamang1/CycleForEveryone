import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //get user data
  useEffect(() => {
    const { name, phone, address, email } = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
  }, [auth?.user]);
  //   form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/api/v1/auth/profile",
        {
          name,
          phone,
          address,
          email,
          password,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Update Profile successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const deleteProfile = async (email) => {
    try {
      console.log(email);
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/deleteuser/${email}`);
      toast.success("User deleted successfully");
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting user information");
    }
  };

  return (
    <Layout title="Cycle For Everyone - Your Profile">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputAddress"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <br />
            </form>
            <button
              className="mt-1 btn btn-danger"
              onClick={() => deleteProfile(email)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
