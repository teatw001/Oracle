import {
  Button,
  Card,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Space,
  Tabs,
  Tag,
  Tooltip,
  type TabsProps,
} from "antd";
import React from "react";
import TableAdmin from "../../Components/Table";
import {
  CloseCircleOutlined,
  EditOutlined,
  ReloadOutlined,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import LayoutAdmin from "../../Layout";
import { useFetchtheATMsQuery } from "../../service/theatm.service";
const { RangePicker } = DatePicker;

const Home = () => {
  const { data: data, isLoading } = useFetchtheATMsQuery();
  console.log(data);
  const columnsCard = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mã Thẻ",
      dataIndex: "MATHE",
      key: "MATHE",
    },
    {
      title: "Mã Tài Khoản",
      dataIndex: "MATK",
      key: "MATK",
    },
    {
      title: "Mã PIN",
      dataIndex: "MAPIN",
      key: "MAPIN",
      render: (pin: string) => "******", // Ẩn vì lý do bảo mật
    },
    {
      title: "Ngày Phát Hành",
      dataIndex: "NGAYPHATHANH",
      key: "NGAYPHATHANH",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "NGAYHETHAN",
      key: "NGAYHETHAN",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Số Thẻ",
      dataIndex: "SOTHE",
      key: "SOTHE",
      render: (so: string) =>
        so.length >= 4 ? `**** **** **** ${so.slice(-4)}` : so,
    },
    {
      title: "CVV",
      dataIndex: "CVV",
      key: "CVV",
      render: () => "***", // Ẩn CVV
    },
    {
      title: "Tình Trạng",
      dataIndex: "TINHTRANG",
      key: "TINHTRANG",
      render: (status: string) => (
        <Tag color={status === "Hoat dong" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              // onClick={() => handleEdit(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa thẻ"
              description="Bạn có chắc muốn xóa thẻ này không?"
              onConfirm={() => confirm(record.MATHE)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<CloseCircleOutlined style={{ color: "red" }} />}
                type="text"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <Card className="mb-10">
            <h1 className="text-xl font-semibold">Quản lý thẻ ATM</h1>
          </Card>
        </div>
        <div>
          <Card>
            <TableAdmin
              data={(data as any)?.Data}
              columns={columnsCard as any}
              prop={{ atm: true }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
