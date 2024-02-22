import React from "react";
import { NavLink } from "react-router-dom";

function UsersMenu() {
  return (
    <>
      <div className="text-center user-menu-bg">
        <ul className="list-group">
          <h4>DashBoard</h4>
          <NavLink to="/dashboard/user/profile" className="menu">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="menu">
            Orders
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default UsersMenu;
