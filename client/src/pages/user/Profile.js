import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UserMenu";

function Profile() {
  return (
    <Layout title="Ecommerce - Your Profile">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
