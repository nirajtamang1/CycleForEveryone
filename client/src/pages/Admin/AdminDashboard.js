import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - Admin">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#0bba48" }}
              >
                <h5 className="mb-0">Admin Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Admin Name:</h6>
                    <p>{auth?.user?.name}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Admin Email:</h6>
                    <p>{auth?.user?.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Admin Phone:</h6>
                    <p>{auth?.user?.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Admin Address:</h6>
                    <p>{auth?.user?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
