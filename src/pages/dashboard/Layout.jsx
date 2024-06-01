import React, { useState } from "react";

export default function LayoutStructure() {
  const [isWideSidebar, setIsWideSidebar] = useState(
    window.innerWidth < 1100 ? false : true
  );

  const toggleSidebarWidth = () => {
    setIsWideSidebar(!isWideSidebar);
  };

  return (
    <div
      className={`grid grid-cols-[${
        isWideSidebar ? "auto,2fr" : "auto,1fr"
      }] grid-rows-[auto,1fr,auto] min-h-screen`}
      style={{ transition: "grid-template-columns 0.5s" }}
    >
      <header className="col-span-full bg-buttonBrand text-white py-3 px-2 md:px-3 md:py-4 lg:p-4  flex items-center gap-3 rounded-br-lg">
        <h1 className="text-3xl font-bold">Header</h1>
        <button
          onClick={toggleSidebarWidth}
          className=" bg-gray-600 text-white px-2 py-1 rounded-md hidden md:block"
        >
          {isWideSidebar ? "N" : "W"}
        </button>
      </header>

      <aside
        className={`row-span-3 bg-buttonBrand text-white p-4 ${
          isWideSidebar ? "w-64" : "w-16"
        }`}
        style={{ transition: "width 0.5s" }}
      >
        <div className="flex items-center justify-between w-full">
          <h2
            className={`text-2xl font-bold ${
              isWideSidebar ? "block" : "hidden"
            }`}
          >
            Sidebar
          </h2>
        </div>
      </aside>

      <main className="col-start-2 p-4">
        <h2 className="text-2xl font-bold">Content</h2>
      </main>

      {/* <footer className="col-start-2 bg-gray-700 text-white p-4">
        <h2 className="text-xl font-bold">Footer</h2>
      </footer> */}
    </div>
  );
}
