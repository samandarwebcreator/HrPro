import React from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TabApplicant from "./components/TabApplicant";
import { searchCandidate } from "../../../Redux/orderReducer";

const { Search } = Input;

export default function OrderAssets() {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.orderReducer.searchResult);
  console.log(searchResult);

  const searchApplicant = (value) => {
    dispatch(searchCandidate(value));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(searchCandidate(value));
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-bold text-xl">Nomzodlar ro&apos;yhati</h2>
        <div>
          <Search
            placeholder="Search..."
            onSearch={searchApplicant}
            enterButton
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div>
        <TabApplicant searchResult={searchResult} />
      </div>
    </div>
  );
}
