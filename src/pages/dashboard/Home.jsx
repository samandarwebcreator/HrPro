import React from "react";
import LayoutStructure from "./Layout";
import { useSelector } from "react-redux";

export default function DashboardHome() {
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);
  return (
    <div
      className={` ${
        openedSidebar ? "bg-navbarHover -z-50" : ""
      } md:bg-transparent z-50`}
    >
      <LayoutStructure />
    </div>
  );
}
