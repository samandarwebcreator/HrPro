import React from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showModal, updateStatus } from "../../../../Redux/orderReducer";

const AcceptChange = () => {
  const isAcceptModalOpen = useSelector(
    (state) => state.orderReducer.isAcceptModalOpen
  );
  const selectedItem = useSelector((state) => state.orderReducer.selectedItem);
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(updateStatus());
    dispatch(showModal(false));
  };

  const handleCancel = () => {
    dispatch(showModal(false));
  };

  return (
    <Modal
      title="Confirmation"
      open={isAcceptModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          No
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Yes
        </Button>,
      ]}
    >
      Are you sure you want to update the status to "New"?
    </Modal>
  );
};

export default AcceptChange;
