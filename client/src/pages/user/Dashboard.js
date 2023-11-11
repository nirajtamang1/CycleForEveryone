import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

function Dashboard() {
  const [auth] = useAuth()
  return (
  
    <Layout title="DashBoard - Ecommerce App">
      <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UsersMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card">
                      <h3>{auth?.user?.name}</h3>
                      <h3>{auth?.user?.email}</h3>
                      <h3>{auth?.user?.address}</h3>
                      <h3>{auth?.user?.phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
}

export default Dashboard;
