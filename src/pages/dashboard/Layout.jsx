import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { wideSidebar } from "../../Redux/generalSlice";
import HomeAssets from "./components/HomeAssets";
import OrderAssets from "./components/OrderAssets";
import { useLocation } from "react-router-dom";

export default function LayoutStructure() {
  const dispatch = useDispatch();
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);
  const location = useLocation();

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
  }, [dispatch]);

  const [dashboardPage, setDashboardPage] = useState(<HomeAssets />);

  useEffect(() => {
    const path = location.pathname.slice(11);
    if (path === "home") {
      setDashboardPage(<HomeAssets />);
    } else if (path === "applications") {
      setDashboardPage(<OrderAssets />);
    } else {
      setDashboardPage(<HomeAssets />);
    }
  }, [location.pathname]);

  return (
    <div className="relative h-screen overflow-hidden">
      <header className="fixed top-0 left-0 right-0 h-[10vh] bg-layoutColor text-white py-3 px-2 md:px-3 md:py-4 lg:p-4 flex items-center gap-4 z-50">
        <h1 className="text-3xl font-bold">Header</h1>
        <button
          className="p-1.5 text-xl rounded-md text-layoutColor font-extrabold bg-white"
          onClick={toggleSidebarWidth}
        >
          <FaBars />
        </button>
      </header>
      <div className="flex h-full pt-[10vh]">
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            openedSidebar
              ? "translate-x-0 lg:w-72"
              : "-translate-x-full lg:translate-x-0 lg:w-[80px]"
          } bg-layoutColor text-white fixed lg:static top-[10vh] left-0 h-full z-40 lg:z-auto w-72`}
        >
          <aside className="h-full overflow-y-auto px-4 mt-4">
            <Menu />
          </aside>
        </div>
        <main
          className={`flex-1 p-4 main_section bg-mainBg transition-all duration-500 ease-in-out overflow-y-auto ml-0 ${
            openedSidebar ? "lg:ml-22" : "lg:ml-[0px]"
          }`}
        >
          {dashboardPage}
        </main>
      </div>
      <div
        onClick={() => dispatch(wideSidebar(false))}
        className={`fixed inset-0 bg-black opacity-50 ${
          openedSidebar ? "block" : "hidden"
        } lg:hidden`}
      ></div>
    </div>
  );
}
