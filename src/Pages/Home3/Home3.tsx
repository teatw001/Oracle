import {
  Button,
  Card,
  DatePicker,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tabs,
  Tag,
  Tooltip,
  type TabsProps,
} from "antd";
import React, { useState } from "react";
import TableAdmin from "../../Components/Table";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import LayoutAdmin from "../../Layout";
import {
  useFetchnhanViensQuery,
  useGetnhanVienByIdQuery,
  useRemovenhanVienMutation,
} from "../../service/nhanvien.service";
import Update from "../../Components/Update";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;

const Home3 = () => {
  const { data: data, isLoading } = useFetchnhanViensQuery();
  const [removeNhanVien, { isLoading: isRemoving }] =
    useRemovenhanVienMutation();
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [selectedNV, setSelectedNV] = React.useState<any>(null);
  const handleEdit = (record: any) => {
    setSelectedNV(record);
    setOpenUpdate(true);
  };

  const confirm = async (id: string | number) => {
    try {
      await removeNhanVien(id).unwrap();
      toast.success(`Xóa nhân viên thành công!`);
    } catch (error) {
      toast.error("Xóa nhân viên thất bại!");
      console.error(error);
    }
  };

  // Hàm cancel khi người dùng hủy xóa
  const cancel = () => {
    toast.info("Đã hủy xóa nhân viên");
  };
  const randomTrangThai = () => {
    return Math.random() < 0.5 ? "Làm việc" : "Thôi Việc";
  };
  const processedData = ((data as any)?.data || []).map((nv: any) => ({
    ...nv,
    trangThai: nv.trangThai || randomTrangThai(),
  }));
  const columnsnv = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },

    {
      title: "Mã NV",
      dataIndex: "MANV",
      key: "MANV",
    },
    {
      title: "Họ tên",
      dataIndex: "HOTEN",
      key: "HOTEN",
    },
    {
      title: "Ngày sinh",
      dataIndex: "NGAYSINH",
      key: "NGAYSINH",
      render: (date: string) => {
        const d = new Date(date);
        const formatted = d.toLocaleDateString("vi-VN"); // dd/mm/yyyy
        return formatted;
      },
    },
    {
      title: "CCCD",
      dataIndex: "CCCD",
      key: "CCCD",
      render: (cccd: string) => {
        if (cccd.length < 5) return "*****";
        return `${cccd.slice(0, 2)}${"*".repeat(cccd.length - 5)}${cccd.slice(
          -3
        )}`;
      },
    },
    {
      title: "SDT",
      dataIndex: "SDT",
      key: "SDT",
      render: (sdt: string) => {
        if (sdt.length < 6) return "***";
        return `${sdt.slice(0, 3)}***${sdt.slice(-3)}`;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "DIACHI",
      key: "DIACHI",
    },
    {
      title: "email",
      dataIndex: "EMAIL",
      key: "EMAIL",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text: string) => (
        <Tag
          color={text === "Làm việc" ? "green" : "red"}
          className="rounded-md px-3 py-1 text-sm"
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 80,
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex justify-center space-x-1">
          <Tooltip title="Sửa">
            <Button
              onClick={() => handleEdit(record)}
              icon={<EditOutlined style={{ color: "gray" }} />}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Duyệt">
            <Button
              icon={<CheckCircleOutlined style={{ color: "#87d068" }} />}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa nhân viên"
              description="Bạn có chắc muốn xóa nhân viên không?  "
              onConfirm={() => confirm(record?.MANV)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<CloseCircleOutlined style={{ color: "red" }} />}
                type="text"
                loading={isRemoving}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="space-y-6">
        <div>
          <Card className="mb-10">
            <h1 className="text-xl font-semibold">Quản lý nhân viên</h1>
            {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
          </Card>
        </div>
        <div>
          <Card>
            <TableAdmin
              data={processedData}
              columns={columnsnv as any}
              prop={{ nhanvien: true }}
            />
          </Card>
        </div>
      </div>
      <Update
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        data={selectedNV}
      />
    </>
  );
};

export default Home3;
