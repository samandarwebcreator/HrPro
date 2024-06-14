import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import CustomTable from "./Table";

const TabApplicant = () => {
  const mapArray = [
    {
      id: 1,
      name: "okay",
      placeholder: <CustomTable />,
      icon: AppleOutlined,
    },
    {
      id: 2,
      name: "empty",
      placeholder: <div></div>,
      icon: AndroidOutlined,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="2"
      className="bg-white rounded-lg px-4 mt-4"
      items={mapArray.map((item) => ({
        key: String(item.id),
        label: `Tab ${item.id}`,
        children: item.placeholder,
        icon: React.createElement(item.icon),
      }))}
    />
  );
};

export default TabApplicant;
