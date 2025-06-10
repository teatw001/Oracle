// ATMModal.tsx
import React, { useEffect } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Button,
  Form,
  message,
  Checkbox,
  Radio,
} from "antd";
import dayjs from "dayjs";
import { useUpdateNhanVienMutation } from "../service/nhanvien.service";
import { toast } from "react-toastify";
import { useUpdatetheATMMutation } from "../service/theatm.service";

const UpdateAtm = ({ open, onCancel, data }: any) => {
  const [form] = Form.useForm();
  console.log(data);

  const [update] = useUpdatetheATMMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        mathe: data?.MATHE,
        matk: data?.MATK,
        mapin: data.MAPIN,
        ngayphathanh: data.NGAYPHATHANH ? dayjs(data.NGAYPHATHANH) : null,
        ngayhethan: data.NGAYHETHAN ? dayjs(data.NGAYHETHAN) : null,
        tinhtrang: data.TINHTRANG === "Hoat dong" ? "Hoat dong" : "Khoa",
        CVV: data?.CVV,
      });
    }
  }, [data, form]);

  const handleFinish = async (values: any) => {
    try {
      const updatedCard = {
        ...values,
        ngayphathanh: values.ngayphathanh.format("YYYY-MM-DD"),
        ngayhethan: values.ngayhethan.format("YYYY-MM-DD"),
      };

      await update({
        id: data?.MATHE,
        ...updatedCard,
        sothe: data?.SOTHE,
        cvv: data?.cvv,
      }).unwrap();

      toast.success("Cập nhật thẻ thành công!");
      form.resetFields();
      onCancel();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật thẻ!");
    }
  };

  return (
    <Modal
      title="Cập nhật thẻ ATM"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        style={{ paddingTop: 12 }}
      >
        <Form.Item label="Mã thẻ" name="mathe" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Mã tài khoản"
          name="matk"
          rules={[{ required: true, message: "Vui lòng nhập mã tài khoản" }]}
        >
          <Input disabled placeholder="TK001" />
        </Form.Item>

        <Form.Item
          label="Mã PIN"
          name="mapin"
          rules={[{ required: true, message: "Vui lòng nhập mã PIN" }]}
        >
          <Input maxLength={6} placeholder="1234" />
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

        <Form.Item
          name="tinhtrang"
          label="Tình trạng"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="Hoat dong">Active</Radio>
            <Radio value="Khoa">Khóa</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Đóng</Button>
          <Button
            type="primary"
            className="bg-green-500"
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateAtm;
