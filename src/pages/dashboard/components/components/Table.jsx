import React, { useState, useEffect, useCallback } from "react";
import { Table as AntTable, Spin, Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { popUpArray, statusPopUp } from "../../../../lib/data";
import { showModal, setSelectedItem } from "../../../../Redux/orderReducer";
import AcceptChange from "./AcceptChange";

const CustomTable = ({ status }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState({});
  const [secondaryPopoverVisible, setSecondaryPopoverVisible] = useState({});
  const [popoverContent, setPopoverContent] = useState({});
  const searchResult = useSelector((state) => state.orderReducer.searchResult);
  const dispatch = useDispatch();

  const openStatusModal = (item) => {
    dispatch(setSelectedItem(item));
    dispatch(showModal(true));
  };

  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const response = await fetch("http://localhost:8001/v1/application");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const applications = result.data.applications;
      const filteredData = applications.filter(
        (item) => item.status === status
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setFetching(false);
    }
  }, [status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchResult) {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchResult.toLowerCase())
      );
      setData(filteredData);
    } else {
      fetchData();
    }
  }, [searchResult, fetchData]);

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

  const handleSecondaryPopoverVisibleChange = (visible, record) => {
    setSecondaryPopoverVisible((prev) => ({
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
            <Popover
              content={
                <div>
                  {statusPopUp.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => openStatusModal(record)}
                        className="flex items-center justify-start gap-2 p-2 hover:bg-popoverHover hover:cursor-pointer rounded-lg"
                      >
                        <span className={`text-${item.color}`}>
                          {item.icon}
                        </span>
                        <p>{item.name}</p>
                      </button>
                    </div>
                  ))}
                  <AcceptChange />
                </div>
              }
              trigger="click"
              open={secondaryPopoverVisible[record.id]}
              onOpenChange={(visible) =>
                handleSecondaryPopoverVisibleChange(visible, record)
              }
            >
              <div
                className="flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </div>
            </Popover>
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

  return (
    <div>
      <div className="rounded-lg bg-white mt-4">
        {fetching ? (
          <Spin />
        ) : (
          <AntTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey="id"
          />
        )}
      </div>
    </div>
  );
};

export default CustomTable;
