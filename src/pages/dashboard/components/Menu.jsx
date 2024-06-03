import React, { useState, useEffect } from "react";
import { menuArray } from "../../../lib/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Menu() {
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);
  const [showText, setShowText] = useState(false);
  const location = useLocation();

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

  return (
    <div>
      {menuArray.map((item) => (
        <div className="mb-2" key={item.id}>
          <Link
            className={`flex gap-3 items-center py-2 px-3 rounded-lg ${
              location.pathname.includes(item.link)
                ? "bg-white text-layoutColor font-semibold"
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
