import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title="DashBoard - Cycle  App">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#0bba48" }}
              >
                <h5 className="mb-0">User Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold">User Name:</h6>
                    <p>{auth?.user?.name}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">User Email:</h6>
                    <p>{auth?.user?.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold">User Phone:</h6>
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

export default Dashboard;
