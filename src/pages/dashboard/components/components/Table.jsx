import React, { useState, useEffect, useCallback } from "react";
import { Table as AntTable, Spin, Popover, Button } from "antd"; // Import Popover from antd
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const CustomTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState({}); // State for popover visibility
  const [popoverContent, setPopoverContent] = useState({}); // State for popover content
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

  const renderPopoverContent = (record) => (
    <div>
      <p>Name: {record.name}</p>
      <p>Work: {record.work}</p>
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
          title="Popover Title"
          trigger="click"
          open={popoverVisible[record.key]}
          onOpenChange={(visible) =>
            handlePopoverVisibleChange(visible, record)
          }
        >
          <button
            className="py-1 px-2 border-2 rounded-lg "
            type="link"
            onClick={(e) => {
              e.stopPropagation(); // Prevent table row selection when clicking popover button
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
