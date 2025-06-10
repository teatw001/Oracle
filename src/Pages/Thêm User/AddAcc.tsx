import React, { useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { useAddAccountMutation } from "../../service/Account.service";
import { toast } from "react-toastify";

const { Option } = Select;

const AddAcc = () => {
  const [form] = Form.useForm();
  const [addAcc] = useAddAccountMutation();
  const [loading, setLoading] = useState(false);

  const generateRandomID = (prefix: string) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}${randomNum}`;
  };

  const onFinish = async (values: any) => {
    const { taikhoan, matkhau, vaitro } = values;

    const payload =
      vaitro === "customer"
        ? {
            makh: "KH001",
            manv: "NV001",
            taikhoan,
            matkhau,
            vaitro,
          }
        : {
            makh: "KH001",
            manv: "NV001",
            taikhoan,
            matkhau,
            vaitro,
          };

    try {
      setLoading(true);
      await addAcc(payload).unwrap();
      toast.success("Tạo tài khoản thành công!");
      form.resetFields();
    } catch (error) {
      toast.error("Tạo tài khoản thất bại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <Card title="Tạo Tài Khoản Mới" className="w-full max-w-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tài khoản"
            name="taikhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input placeholder="Nhập tài khoản" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matkhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="vaitro"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="personnel">Khách hàng</Option>
              <Option value="personnel">Nhân viên</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddAcc;
