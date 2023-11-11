import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Layout title="Page Not found - Go Back">
      <div className="PageNotFound">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Page Not found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
