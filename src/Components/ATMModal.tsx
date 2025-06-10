import React, { useEffect } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Button,
  Form,
  Checkbox,
  message,
} from "antd";
import dayjs from "dayjs";
import { useAddtheATMMutation } from "../service/theatm.service";

const randomDigits = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

const ATMModal = ({ open, onCancel, onOk }: any) => {
  const [form] = Form.useForm();
  const [addCart, { isLoading }] = useAddtheATMMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const data = {
        mathe: values.mathe,
        matk: values.matk,
        mapin: values.mapin,
        ngayphathanh: values.ngayphathanh.format("YYYY-MM-DD"),
        ngayhethan: values.ngayhethan.format("YYYY-MM-DD"),
        tinhtrang: values.tinhtrang ? "active" : "inactive",
        sothe: randomDigits(16),
        cvv: randomDigits(3),
      };

      const res = await addCart(data).unwrap(); // gọi API và unwrap để bắt lỗi rõ
      message.success("Tạo thẻ thành công!");

      form.resetFields();
      onOk?.(res); // callback nếu bạn muốn cập nhật UI cha
    } catch (err: any) {
      console.error("Lỗi tạo thẻ:", err);
      message.error("Tạo thẻ thất bại. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open]);

  return (
    <Modal
      title="Tạo thẻ ATM"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        style={{ paddingTop: 12 }}
        initialValues={{
          tinhtrang: true,
        }}
      >
        <Form.Item
          label="Mã thẻ"
          name="mathe"
          rules={[{ required: true, message: "Vui lòng nhập mã thẻ" }]}
        >
          <Input placeholder="TH001" />
        </Form.Item>

        <Form.Item
          label="Mã tài khoản"
          name="matk"
          rules={[{ required: true, message: "Vui lòng nhập mã tài khoản" }]}
        >
          <Input placeholder="TK001" />
        </Form.Item>

        <Form.Item
          label="Mã PIN"
          name="mapin"
          rules={[{ required: true, message: "Vui lòng nhập mã PIN" }]}
        >
          <Input placeholder="1234" />
        </Form.Item>

        <Form.Item
          label="Ngày phát hành"
          name="ngayphathanh"
          rules={[{ required: true, message: "Chọn ngày phát hành" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Ngày hết hạn"
          name="ngayhethan"
          rules={[{ required: true, message: "Chọn ngày hết hạn" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="tinhtrang" valuePropName="checked">
          <Checkbox>Thẻ đang hoạt động</Checkbox>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Đóng</Button>
          <Button
            type="primary"
            className="bg-green-500"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Thực hiện
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ATMModal;
