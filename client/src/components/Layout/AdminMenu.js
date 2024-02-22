import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="user-menu-bg">
        <ul className="list-group">
          <h4>Admin Panel</h4>

          <NavLink to="/dashboard/admin/create-category" className="menu">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="menu">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="menu">
            Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="menu">
            Users
          </NavLink>
          <NavLink to="/dashboard/admin/order" className="menu">
            Order
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default AdminMenu;
