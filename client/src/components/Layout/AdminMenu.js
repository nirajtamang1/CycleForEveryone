import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h4>Admin Panel</h4>

          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item">
            Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item">
            Users
          </NavLink>
          <NavLink to="/dashboard/admin/order" className="list-group-item">
            Order
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default AdminMenu;
