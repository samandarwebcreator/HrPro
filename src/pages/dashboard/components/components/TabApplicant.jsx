import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import CustomTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { changeTabId } from "../../../../Redux/orderReducer";

const TabApplicant = () => {
  const mapArray = [
    {
      id: 1,
      status: "New",
      icon: AppleOutlined,
      tabName: "Arizachilar",
    },
    {
      id: 2,
      status: "Jarayonda",
      icon: AndroidOutlined,
      tabName: "Jarayondagilar",
    },
  ];

  const tabId = useSelector((state) => state.orderReducer.tabId);
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
