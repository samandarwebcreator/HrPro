import React, { useState, useEffect } from "react";
import { Button, Table as AntTable, Spin } from "antd";
import { useMediaQuery } from "react-responsive";

const CustomTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://666c1ab049dbc5d7145c9d50.mockapi.io/applicants/users"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
        <Button type="link" onClick={() => console.log("Action", record)}>
          Action
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div
        className="rounded-lg bg-white mt-4"
        style={{
          marginBottom: 16,
        }}
      >
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
