import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { statusPopUp } from "../../../../lib/data";
import { Popover } from "antd";
import AcceptChange from "./AcceptChange";
import { setSelectedItem, showModal } from "../../../../Redux/orderReducer";

export default function PopOver({ record }) {
  const [secondaryPopoverVisible, setSecondaryPopoverVisible] = useState({});
  const handleSecondaryPopoverVisibleChange = (visible, record) => {
    setSecondaryPopoverVisible((prev) => ({
      ...prev,
      [record.id]: visible,
    }));
  };
  const dispatch = useDispatch();

  const openStatusModal = (item) => {
    dispatch(setSelectedItem(item));
    dispatch(showModal(true));
  };

  return (
    <div>
      <Popover
        content={
          <div>
            {statusPopUp.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => openStatusModal(record)}
                  className="flex items-center justify-start gap-2 p-2 hover:bg-popoverHover hover:cursor-pointer rounded-lg"
                >
                  <span className={`text-${item.color}`}>{item.icon}</span>
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
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <span className="ml-2">{record.name}</span>{" "}
        </div>
      </Popover>
    </div>
  );
}
