import React, { useState, useEffect, useCallback } from "react";
import { Table as AntTable, Spin } from "antd";
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const CustomTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
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
        ]
      : []),
    {
      title: "Action",
      dataIndex: "button",
      render: (_, record) => (
        <button
          className="py-1 px-2 border-2 rounded-lg "
          type="link"
          onClick={() => console.log("Action", record)}
        >
          <BsThreeDotsVertical />
        </button>
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
