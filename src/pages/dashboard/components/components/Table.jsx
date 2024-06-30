import React, { useState, useEffect, useCallback } from "react";
import { Table as AntTable, Spin, Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { popUpArray } from "../../../../lib/data";

const CustomTable = ({ status }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  console.log(data);
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
      const applications = result.data.applications;
      console.log(applications);
      const filteredData = applications.filter(
        (item) => item.status === status
      );
      console.log(filteredData);
      setData(filteredData);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFetching(false);
    }
  }, [status]);

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
              content={<div>Secondary Popover Content</div>}
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
            rowKey="id" // Ensure that each row has a unique key
          />
        )}
      </div>
    </div>
  );
};

export default CustomTable;
