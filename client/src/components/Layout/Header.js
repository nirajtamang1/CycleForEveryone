import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsBicycle } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <header>
        {/* {JSON.stringify(categories, null, 4)} */}
        <nav className="navbar navbar-expand-lg custom-bg-color">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand nav-link">
              <BsBicycle />
              Booking App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu custom-bg-color">
                    <li>
                      <Link
                        className="dropdown-item nav-link custom-bg-color"
                        to={"/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item nav-link custom-bg-color"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className="nav-link custom-bg-color"
                      >
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </a>
                      <ul className="dropdown-menu custom-bg-color">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="nav-link"
                          >
                            DashBoard
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="nav-link"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                <Badge count={cart?.length} showZero>
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      Cart
                    </NavLink>
                  </li>
                </Badge>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
