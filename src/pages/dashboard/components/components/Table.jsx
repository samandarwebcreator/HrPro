import React, { useState } from "react";
import { Table as AntTable, Spin, Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { popUpArray } from "../../../../lib/data";
import PopOver from "./PopOver";
import useFetch from "../../../../lib/FetchHook";

const CustomTable = ({ status }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState({});
  const [popoverContent, setPopoverContent] = useState({});
  const searchResult = useSelector((state) => state.orderReducer.searchResult);
  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  const { data, loading, error } = useFetch(
    "http://localhost:8001/v1/application"
  );

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleActionClick = (record) => {
    setPopoverContent((prev) => ({
      ...prev,
      [record.id]: renderPopoverContent(record),
    }));
    setPopoverVisible((prev) => ({
      ...prev,
      [record.id]: true,
    }));
  };

  const handlePopoverVisibleChange = (visible, record) => {
    setPopoverVisible((prev) => ({
      ...prev,
      [record.id]: visible,
    }));
  };

  const renderPopoverContent = (record) => (
    <div>
      {popUpArray.map((item) => (
        <div
          key={item.id}
          className={`flex items-center ${item.color} px-2 py-1 hover:bg-popoverHover hover:cursor-pointer rounded-lg`}
        >
          {item.hasSecondaryPopover ? (
            <PopOver record={record} />
          ) : (
            <>
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    ...(isMdOrLarger
      ? [
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "button",
      render: (_, record) => (
        <Popover
          content={popoverContent[record.id]}
          trigger="click"
          open={popoverVisible[record.id]}
          onOpenChange={(visible) =>
            handlePopoverVisibleChange(visible, record)
          }
        >
          <button
            className="py-1 px-2 border-2 rounded-lg"
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick(record);
            }}
          >
            <BsThreeDotsVertical />
          </button>
        </Popover>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="rounded-lg bg-white mt-4">
        <AntTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data?.data?.applications || []}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default CustomTable;
