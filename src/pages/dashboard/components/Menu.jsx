import React, { useState, useEffect } from "react";
import { menuArray } from "../../../lib/data";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { wideSidebar } from "../../../Redux/generalSlice";

export default function Menu() {
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);
  const [showText, setShowText] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openedSidebar) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 190);

      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [openedSidebar]);

  const closeSidebar = () => {
    dispatch(wideSidebar(false));
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-2 py-2">
        <h3 className="text-xl font-bold">Menu</h3>
        <button onClick={closeSidebar}>
          <IoClose className="font-bold text-3xl p-1 rounded-md hover:bg-gray-500 active:bg-gray-700" />
        </button>
      </div>
      {menuArray.map((item) => (
        <div className="mb-2" key={item.id}>
          <Link
            className={`flex gap-3 items-center py-2 hover:bg-gray-500 px-3 rounded-lg ${
              location.pathname.includes(item.link)
                ? "bg-white text-layoutColor hover:bg-white font-semibold"
                : ""
            }`}
            to={`/dashboard/${item.link}`}
          >
            <span className={`${!showText ? "pl-1 pt-1 pb-1 font-bold" : ""}`}>
              {item.icon}
            </span>
            <p className={`${showText ? "block" : "hidden"}`}>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
