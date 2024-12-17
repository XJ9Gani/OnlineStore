import shopIcon from "../assets/shop.svg";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const linkStyle =
    "p-[0.5rem] hover:bg-[#1a1a1a] rounded-lg hover:text-white transition duration-200 ease-in-out";

  const isActive = useCallback(
    ({ isActive }) =>
      isActive ? "p-[0.5rem] bg-[#1a1a1a] rounded-lg text-white" : linkStyle,
    [linkStyle]
  );

  return (
    <header className=" bg-white h-[10vh] border flex justify-around items-center shadow-md sticky top-0 left-0 ">
      <nav className="flex gap-10 text-xl p-[1rem] ">
        <img src={shopIcon} className="w-12 h-12 m-0" alt="Shop Icon" />
        <NavLink to="/" className={isActive}>
          Home Page
        </NavLink>
        <NavLink to="/profile" className={isActive}>
          Profile
        </NavLink>
        <NavLink to="/products" className={isActive}>
          Products
        </NavLink>
      </nav>
      <nav className="flex gap-10 text-xl p-[1rem] ">
        <NavLink to="/registration" className={isActive}>
          Sing Up
        </NavLink>
        <NavLink to="/login" className={isActive}>
          Sing In
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
