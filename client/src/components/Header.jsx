import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import logo from "../assets/img/logo1.png";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="bg-[#50d71e] p-4 h-[100px]">
      <div className="max-w-[1240px] py-[15px] items-center flex justify-between mx-auto">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo of Cycle For Everyone"
            className="w-[50px] h-[50px]"
          />
          <ul
            className={`md:flex hidden text-white gap-5 items-center pl-[20px]`}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rental">Rental</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </ul>
          {/* Resposinsive menu */}
          <ul
            className={`duration-300 md:hidden w-full h-screen fixed text-white bg-black top-[92px]
         ${toggle ? "left-[0%]" : "left-[-100%]"} `}
          >
            <li className="p-2">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="p-2">
              {" "}
              <NavLink to="/rental">Rental</NavLink>
            </li>
            <li className="p-2">
              {" "}
              <NavLink to="/faq">FAQ</NavLink>
            </li>
          </ul>
        </div>
        <div className="relative flex">
          <input
            type="text"
            className="rounded-2xl border-2 border-indigo-600 outline-none pl-10"
            placeholder="Search..."
          />
          <button className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="text-indigo-600 text-white" />
          </button>

          <button onClick={addToCart}>
            <AiOutlineShoppingCart className="text-3xl text-white ml-2" />
          </button>
          {cartCount > 0 && (
            <span className="inline-block w-[2px] text-white text-sm px-[3px]">
              {cartCount}
            </span>
          )}

          {toggle ? (
            <AiOutlineClose
              onClick={() => setToggle(!toggle)}
              className="text-4xl font-bold text-white md:hidden block pl-3"
            />
          ) : (
            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              className="text-4xl font-bold text-white md:hidden block pl-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
