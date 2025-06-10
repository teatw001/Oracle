// ATMModal.tsx
import React, { useEffect } from "react";
import { Modal, Input, DatePicker, Button, Form, message } from "antd";
import dayjs from "dayjs";
import { useUpdateNhanVienMutation } from "../service/nhanvien.service";

const Update = ({ open, onCancel, data }: any) => {
  const [form] = Form.useForm();
  console.log(data);

  const [updateStaff] = useUpdateNhanVienMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        manv: data.MANV,
        hoten: data.HOTEN,
        ngaysinh: data.NGAYSINH ? dayjs(data.NGAYSINH) : null,
        cccd: data.CCCD,
        sdt: data.SDT,
        diachi: data.DIACHI,
        chucvu: data.CHUCVU,
        email: data.EMAIL,
      });
    }
  }, [data, form]);

  const handleFinish = async (values: any) => {
    try {
      const updatedStaff = {
        ...values,
        ngaysinh: values.ngaysinh.format("YYYY-MM-DD"),
      };

      await updateStaff({ id: data.MANV, ...updatedStaff }).unwrap();

      message.success("Cập nhật nhân viên thành công!");
      form.resetFields();
      onCancel();
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật nhân viên!");
    }
  };

  return (
    <Modal
      title="Cập nhật nhân viên"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        name="update-nv-form"
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
          <Input disabled />
        </Form.Item>

        <Form.Item label="Họ tên:" name="hoten" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh:"
          name="ngaysinh"
          rules={[{ required: true }]}
        >
          <DatePicker format="DD/MM/YYYY" className="w-full" />
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
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default Update;
