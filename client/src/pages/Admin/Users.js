import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get(
        " http://localhost:8080/api/v1/user/get-user"
      );
      if (data?.success) {
        setUser(data?.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some this went wrong while getting user information");
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);
  const handleDelete = async (pid) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/user/delete-user/${pid}`
      );
      toast.success("Delete User Successfully");
      getAllUser();
    } catch (error) {
      toast.error("Error while deleting User information");
    }
  };
  return (
    <Layout title={"Dashboard - All Users"}>
      {console.log(user)}
      <div className="container-fluid -3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>

            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((c) => (
                    <tr>
                      <>
                        <td key={c._id}>{c.name}</td>
                        <td key={c._id}>{c.phone}</td>
                        <td key={c._id}>{c.address}</td>
                        <td key={c._id}>{c.email}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-3"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-3"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
