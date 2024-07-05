import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { useDispatch } from "react-redux";
import { changeTabId } from "../../../../Redux/orderReducer";
import CustomTable from "./Table";

const TabApplicant = () => {
  const mapArray = [
    {
      id: 1,
      status: "new",
      icon: AppleOutlined,
      tabName: "Arizachilar",
    },
    {
      id: 2,
      status: "jarayonda",
      icon: AndroidOutlined,
      tabName: "Jarayondagilar",
    },
    {
      id: 3,
      status: "uchrashuv",
      icon: AndroidOutlined,
      tabName: "Uchrashuv",
    },
  ];

  const dispatch = useDispatch();

  const handleChangeTabId = (key) => {
    dispatch(changeTabId(Number(key)));
  };

  return (
    <Tabs
      defaultActiveKey="1"
      className="bg-white rounded-lg px-4 mt-4"
      onChange={handleChangeTabId}
      items={mapArray.map((item) => ({
        key: String(item.id),
        label: `${item.tabName}`,
        children: <CustomTable status={item.status} />,
        icon: React.createElement(item.icon),
      }))}
    />
  );
};

export default TabApplicant;
