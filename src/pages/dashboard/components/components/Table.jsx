import React, { useState, useEffect, useCallback } from "react";
import { Table as AntTable, Spin, Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { MdInfo } from "react-icons/md";

const CustomTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState({});
  const [secondaryPopoverVisible, setSecondaryPopoverVisible] = useState({});
  const [popoverContent, setPopoverContent] = useState({});
  const searchResult = useSelector((state) => state.orderReducer.searchResult);

  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://666c1ab049dbc5d7145c9d50.mockapi.io/applicants/users"
      );
      const result = await response.json();
      setData(result);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filterData = () => {
      if (searchResult) {
        const filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(searchResult.toLowerCase())
        );
        setData(filteredData);
      } else {
        fetchData();
      }
    };

    filterData();
  }, [searchResult, data, fetchData]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleActionClick = (record) => {
    setPopoverContent((prev) => ({
      ...prev,
      [record.key]: renderPopoverContent(record),
    }));
    setPopoverVisible((prev) => ({
      ...prev,
      [record.key]: true,
    }));
  };

  const handlePopoverVisibleChange = (visible, record) => {
    setPopoverVisible((prev) => ({
      ...prev,
      [record.key]: visible,
    }));
  };

  const handleSecondaryPopoverVisibleChange = (visible, record) => {
    setSecondaryPopoverVisible((prev) => ({
      ...prev,
      [record.key]: visible,
    }));
  };

  const popUpArray = [
    {
      id: 1,
      name: "Tahrirlash",
      icon: <FaUserEdit />,
      color: "text-red-500",
    },
    {
      id: 2,
      name: `O'chirish`,
      icon: <MdDelete />,
      color: "text-yellow-500",
    },
    {
      id: 3,
      name: "Holati",
      icon: <GrStatusCriticalSmall />,
      color: "text-green-500",
      hasSecondaryPopover: true,
    },
    {
      id: 4,
      name: "Ma'lumotlari",
      icon: <MdInfo />,
      color: "text-gray-600",
    },
  ];

  const renderPopoverContent = (record) => (
    <div>
      {popUpArray.map((item) => (
        <div
          key={item.id}
          className={`flex items-center ${item.color} px-2 py-1 hover:bg-popoverHover hover:cursor-pointer rounded-lg`}
        >
          {item.hasSecondaryPopover ? (
            <Popover
              content={<div>Secondary Popover Content</div>}
              trigger="click"
              open={secondaryPopoverVisible[record.key]}
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
            title: "Work",
            dataIndex: "work",
          },
          {
            title: "Action",
            dataIndex: "action",
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
          content={popoverContent[record.key]}
          trigger="click"
          open={popoverVisible[record.key]}
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
            rowKey="key"
          />
        )}
      </div>
    </div>
  );
};

export default CustomTable;
