// ATMModal.tsx
import React from "react";
import { Modal, Input, DatePicker, Button, Form, message } from "antd";
import dayjs from "dayjs";
import { useAddnhanVienMutation } from "../service/nhanvien.service";

const AddNv = ({ open, onCancel }: any) => {
  const [form] = Form.useForm();
  const [addStaff] = useAddnhanVienMutation();

  const handleFinish = async (values: any) => {
    try {
      const newStaff = {
        ...values,
        ngaysinh: values.ngaysinh.format("YYYY-MM-DD"),
      };
      await addStaff(newStaff).unwrap();
      message.success("Thêm nhân viên thành công!");
      form.resetFields();
      onCancel(); // đóng modal
    } catch (err) {
      message.error("Lỗi khi thêm nhân viên!");
    }
  };

  return (
    <Modal
      title="Thêm nhân viên"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        name="add-nv-form"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 2 }}
        colon={false}
        style={{ maxWidth: 600, paddingTop: 20 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Mã nhân viên:"
          name="manv"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Họ tên:" name="hoten" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh:"
          name="ngaysinh"
          rules={[{ required: true }]}
        >
          <DatePicker
            placeholder="Ngày sinh"
            format="DD/MM/YYYY"
            className="w-full"
          />
        </Form.Item>

        <Form.Item label="CCCD:" name="cccd" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="SĐT:" name="sdt" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ:" name="diachi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Chức vụ:" name="chucvu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Đóng</Button>
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600"
            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
            htmlType="submit"
          >
            Thực hiện
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNv;
