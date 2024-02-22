import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/user/get-user"
      );
      if (data?.success) {
        setUsers(data?.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching user information");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/delete-user/${userId}`);
      toast.success("User deleted successfully");
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting user information");
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">All Users</h1>
            <div className="table-responsive">
              <table className="table table-striped">
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
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() =>
                            navigate(`/dashboard/admin/users/${user._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
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
