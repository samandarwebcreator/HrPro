import React from "react";
import LayoutStructure from "./Layout";
import { useSelector } from "react-redux";

export default function DashboardHome() {
  const openedSidebar = useSelector((state) => state.general.sidebarOpen);
  return (
    <div>
      <LayoutStructure />
    </div>
  );
}
