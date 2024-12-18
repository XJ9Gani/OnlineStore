import shopIcon from "../assets/shop.svg";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const linkStyle =
    "lg:text-xl max-sm:text-center max-sm:text-[1rem] max-sm:w-[20px] max-sm:h-[20px] p-[0.5rem] hover:bg-[#1a1a1a] rounded-lg hover:text-white transition duration-200 ease-in-out";

  const isActive = useCallback(
    ({ isActive }) =>
      isActive ? "p-[0.5rem] bg-[#1a1a1a] rounded-lg text-white" : linkStyle,
    [linkStyle]
  );

  return (
    <header
      className="bg-white h-[10vh] border flex justify-around items-center shadow-md z-10
      lg:sticky lg:top-0 lg:left-0 
      md:fixed md:bottom-0 md:left-0 
      max-sm:fixed max-sm:bottom-0 max-sm:left-0 
      max-sm:w-full
      "
    >
      <nav className="flex gap-10 text-xl p-[1rem]">
        <img
          src={shopIcon}
          className="w-12 h-12 m-0  max-sm:w-8 max-sm:h-8"
          alt="Shop Icon"
        />
        <NavLink to="/home" className={isActive}>
          Home Page
        </NavLink>
        <NavLink to="/profile" className={isActive}>
          Profile
        </NavLink>
        <NavLink to="/products" className={isActive}>
          Products
        </NavLink>
      </nav>

      <nav className="flex gap-10 text-xl p-[1rem]">
        <NavLink
          to="/"
          className={`${isActive} max-sm:hidden p-[0.5rem] text-white`}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={`${isActive} max-sm:hidden p-[0.5rem] text-white`}
        >
          Sign In
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
