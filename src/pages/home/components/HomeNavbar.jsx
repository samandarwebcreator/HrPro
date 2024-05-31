import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function HomeNavbar() {
  return (
    <div className="border-b border-black py-4 z-50">
      <div className="container flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-white">LOGO</h1>

        <nav className="hidden md:block ">
          <ul className="flex gap-10 py-1 px-1 bg-white rounded-full bg-glassBg/70 backdrop-blur-xl  shadow-navbarShadow">
            <Link
              className=" md:text-sm lg:text-lg text-black rounded-full px-3 pb-[2px] hover:bg-buttonBrand hover:text-white  transition-all duration-300"
              to="/"
            >
              About
            </Link>
            <Link
              className=" md:text-sm lg:text-lg text-black rounded-full px-3 pb-[2px] hover:bg-buttonBrand hover:text-white  transition-all duration-300"
              to="/"
            >
              Results
            </Link>
            <Link
              className=" md:text-sm lg:text-lg text-black rounded-full px-3 pb-[2px] hover:bg-buttonBrand hover:text-white transition-all duration-300"
              to="/"
            >
              Contact
            </Link>
          </ul>
        </nav>

        <div>
          <Button className=" w-20 md:w-24 lg:w-32 " type="primary">
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
