import {
  Button,
  Card,
  DatePicker,
  Input,
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
  EditOutlined,
  ReloadOutlined,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import LayoutAdmin from "../../Layout";
import { useGetAllAcccontQuery } from "../../service/Account.service";
import { useGettheATMKHMutation } from "../../service/theatm.service";
const { RangePicker } = DatePicker;

const onChange = (key: string) => {
  console.log(key);
};

const HomeMoney = () => {
  const { data: getAllAccount } = useGetAllAcccontQuery();
  const [dataTB, setDataTB] = useState([]);
  const [getListTheATM] = useGettheATMKHMutation();
  const accountOptions =
    (getAllAccount as any)?.Data?.map((acc: any) => ({
      value: JSON.stringify({ makh: acc.MAKH, role: acc.VAITRO }),
      label: `${acc.TAIKHOAN} (${acc.VAITRO})`,
    })) || [];
  const [selectedAccount, setSelectedAccount] = React.useState<{
    makh: string;
    role: string;
  } | null>(null);
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
      render: (pin: string) => "******",
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
        so?.length >= 4 ? `**** **** **** ${so.slice(-4)}` : so,
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
    // {
    //   title: "Thao tác",
    //   key: "actions",
    //   align: "center",
    //   render: (_: any, record: any) => (
    //     <Space>
    //       <Tooltip title="Sửa">
    //         <Button
    //           icon={<EditOutlined />}
    //           onClick={() => handleEdit(record)}
    //           type="text"
    //         />
    //       </Tooltip>
    //       <Tooltip title="Xóa">
    //         <Popconfirm
    //           title="Xóa thẻ"
    //           description="Bạn có chắc muốn xóa thẻ này không?"
    //           onConfirm={() => confirm(record.MATHE)}
    //           // onCancel={cancel}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Button
    //             icon={<CloseCircleOutlined style={{ color: "red" }} />}
    //             type="text"
    //           />
    //         </Popconfirm>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tìm khách hàng:",
      children: (
        <Space>
          <Select
            showSearch
            placeholder="Chọn tài khoản"
            optionFilterProp="label"
            style={{ width: 300 }}
            options={accountOptions}
            onChange={(value) => {
              const parsed = JSON.parse(value);
              setSelectedAccount(parsed);
            }}
          />
          <Button
            type="primary"
            onClick={async () => {
              if (selectedAccount) {
                const response = await getListTheATM(selectedAccount).unwrap();
                setDataTB(response);
              }
            }}
          >
            Tìm kiếm
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="space-y-6">
        <div>
          <Card className="mb-10">
            <h1 className="text-xl font-semibold">
              Danh sách thẻ ATM của Khách hàng
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>
        </div>
        <div>
          <Card>
            <TableAdmin
              data={(dataTB as any)?.Data}
              columns={columnsCard as any}
              prop={{ atm: false }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomeMoney;
