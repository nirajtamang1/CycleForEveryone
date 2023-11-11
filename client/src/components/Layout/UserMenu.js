import React from "react";
import { NavLink } from "react-router-dom";

function UsersMenu() {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h4>DashBoard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item"
          >
            Orders
          </NavLink>
        
        </ul>
      </div>
    </>
  );
}

export default UsersMenu;
