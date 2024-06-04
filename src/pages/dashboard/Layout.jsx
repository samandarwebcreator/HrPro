import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { wideSidebar } from "../../Redux/generalSlice";

export default function LayoutStructure() {
  const dispatch = useDispatch();
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);

  const toggleSidebarWidth = () => {
    dispatch(wideSidebar(!openedSidebar));
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        window.innerWidth < 1100 ? wideSidebar(false) : wideSidebar(true)
      );
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full">
      <header className="col-span-full min-h-[10vh] bg-layoutColor text-white py-3 px-2 md:px-3 md:py-4 lg:p-4  flex items-center gap-4">
        <h1 className="text-3xl font-bold">Header</h1>
        <button
          className={`p-1.5 text-xl rounded-md text-layoutColor font-extrabold   m-0 bg-white`}
          onClick={toggleSidebarWidth}
        >
          <FaBars />
        </button>
      </header>
      <div
        className={`md:grid w-full  grid-cols-[${
          openedSidebar ? "auto,2fr" : "auto,1fr"
        }] grid-rows-[auto,1fr,auto] min-h-[90vh] `}
        style={{
          transition: "grid-template-columns 0.5s",
        }}
      >
        <div
          className={`flex w-full absolute lg:static top-0  ${
            openedSidebar ? "left-0" : "-left-full"
          }`}
          style={{
            transition: "left 0.5s",
          }}
        >
          <aside
            className={`row-span-3 min-h-screen w-[75%] md:w-[35%] bg-layoutColor text-white p-4 ${
              openedSidebar ? "lg:w-64" : "lg:w-20"
            }`}
            style={{
              transition: "width 0.5s",
            }}
          >
            <Menu />
          </aside>
          <div
            onClick={() => dispatch(wideSidebar(false))}
            className={`${
              openedSidebar ? "bg-navbarHover" : ""
            } w-[25%] md:w-[65%] min-h-screen ${
              openedSidebar ? "block" : "hidden"
            } block lg:hidden`}
          ></div>
        </div>

        <main className="col-start-2 p-4">
          <h2 className="text-2xl font-bold">Content</h2>
        </main>
      </div>
    </div>
  );
}
