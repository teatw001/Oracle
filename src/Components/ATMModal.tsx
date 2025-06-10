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
import { toast } from "react-toastify";
import { useGetAllAcccontQuery } from "../service/Account.service";

const randomDigits = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

const generateRandomMathe = () => `TH${randomDigits(5)}`;

const ATMModal = ({ open, onCancel, onOk }: any) => {
  const [form] = Form.useForm();
  const [addCart, { isLoading }] = useAddtheATMMutation();
  const { data: getAllmaTK } = useGetAllAcccontQuery();


  const currentDate = dayjs();
  const expiryDate = currentDate.add(3, "year");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const data = {
        mathe: values.mathe,
        matk: values.matk,
        mapin: values.mapin,
        ngayphathanh: currentDate.format("YYYY-MM-DD"),
        ngayhethan: expiryDate.format("YYYY-MM-DD"),
        tinhtrang: values.tinhtrang ? "Hoat dong" : "Khoa",
        sothe: randomDigits(16),
        cvv: randomDigits(3),
      };

      const res = await addCart(data).unwrap();
      toast.success("Tạo thẻ thành công!");
      form.resetFields();
      onOk?.(res);
    } catch (err: any) {
      console.error("Lỗi tạo thẻ:", err);
      toast.error("Tạo thẻ thất bại. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        mathe: generateRandomMathe(),
        ngayphathanh: currentDate,
        ngayhethan: expiryDate,
        tinhtrang: true,
      });
    } else {
      form.resetFields();
    }
  }, [open]);

  return (
    <Modal
      title="Tạo thẻ ATM"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" style={{ paddingTop: 12 }}>
        <Form.Item label="Mã thẻ" name="mathe" rules={[{ required: true }]}>
          <Input disabled />
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
          <Input maxLength={6} minLength={6} placeholder="1234" />
        </Form.Item>

        <Form.Item
          label="Ngày phát hành"
          name="ngayphathanh"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" disabled />
        </Form.Item>

        <Form.Item
          label="Ngày hết hạn"
          name="ngayhethan"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" disabled />
        </Form.Item>

        <Form.Item name="tinhtrang">
          <Checkbox>Active</Checkbox>
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
