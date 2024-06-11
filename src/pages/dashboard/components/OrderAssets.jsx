import Search from "antd/es/transfer/search";
import React from "react";
import Table from "./components/Table";

export default function OrderAssets() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-bold text-xl">Nomzodlar ro&apos;yhati</h2>
        <div>
          <Search placeholder="Search..." onSearch={onSearch} enterButton />
        </div>
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}
