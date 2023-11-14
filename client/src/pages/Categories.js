import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

export const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title="All categories">
      <h2>All Categories</h2>
      <div>
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
