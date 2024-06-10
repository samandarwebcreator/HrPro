import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { wideSidebar } from "../../Redux/generalSlice";
import HomeAssets from "./components/HomeAssets";

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
  }, [dispatch]);

  return (
    <div className="relative w-full">
      <header className="min-h-[10vh] bg-layoutColor text-white py-3 px-2 md:px-3 md:py-4 lg:p-4 flex items-center gap-4">
        <h1 className="text-3xl font-bold">Header</h1>
        <button
          className="p-1.5 text-xl rounded-md text-layoutColor font-extrabold bg-white"
          onClick={toggleSidebarWidth}
        >
          <FaBars />
        </button>
      </header>
      <div className="flex">
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            openedSidebar
              ? "translate-x-0 lg:w-72"
              : "-translate-x-full lg:translate-x-0 lg:w-[80px]"
          } bg-layoutColor text-white fixed lg:static top-0 h-full z-50 lg:z-auto w-72`}
        >
          <aside className="min-h-[90vh] px-4 mt-2">
            <Menu />
          </aside>
        </div>
        <main
          className={`flex-1 p-4 transition-all duration-500 ease-in-out ${
            openedSidebar ? "lg:ml-102" : "lg:ml-[80px]"
          }`}
        >
          <HomeAssets />
        </main>
      </div>
      <div
        onClick={() => dispatch(wideSidebar(false))}
        className={`fixed inset-0  bg-black opacity-50 ${
          openedSidebar ? "block" : "hidden"
        } lg:hidden`}
      ></div>
    </div>
  );
}
