import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import CustomTable from "./Table";
import { useSelector } from "react-redux";

const TabApplicant = () => {
  const mapArray = [
    {
      id: 1,
      name: "okay",
      placeholder: <CustomTable />,
      icon: AppleOutlined,
      tabName: "Arizachilar",
    },
    {
      id: 2,
      name: "empty",
      placeholder: <div></div>,
      icon: AndroidOutlined,
      tabName: "Jarayondagilar",
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      className="bg-white rounded-lg px-4 mt-4"
      items={mapArray.map((item) => ({
        if(condition) {},
        key: String(item.id),
        label: `${item.tabName}`,
        children: item.placeholder,
        icon: React.createElement(item.icon),
      }))}
    />
  );
};

export default TabApplicant;
