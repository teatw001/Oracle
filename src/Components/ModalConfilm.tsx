import { Button, Modal } from "antd";
import React from "react";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
const ModalConfilm = ({ open, onCancel, onOk }: any) => {
  return (
    <div>
      <Modal
        title={
          <div className="flex items-center gap-2">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            <span>Xác nhận tạo thẻ cho KH</span>
          </div>
        }
        open={open}
        width={450}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <p className="px-6">
          Bạn xác nhận tạo thẻ cho Khách hàng Nguyễn Văn A - ASC6477565859 với
          hạn mức 120,000,000 đ.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Đóng</Button>
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600"
            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            onClick={onOk}
          >
            Thực hiện
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalConfilm;
