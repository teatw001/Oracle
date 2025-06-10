import React, { useEffect, useState } from "react";
import { useGettheATMKHMutation } from "../../service/theatm.service";
import { Button, Card, Space, Tag, Tooltip } from "antd";
import { getUser } from "../Login/utils/auth";
import TableAdmin from "../../Components/Table";

const ListATMKH = () => {
  const user = getUser();
  console.log(user?.MAKH);

  const [getListThe] = useGettheATMKHMutation();
  const [dataTable, setDataTable] = useState([]);
  console.log(dataTable);

  useEffect(() => {
    if (user?.MAKH) {
      getListThe({ makh: user.MAKH, role: "customer" })
        .unwrap()
        .then((res) => {
          setDataTable(res?.Data || []);
        })
        .catch((err) => {
          console.error("Failed to fetch ATM list:", err);
        });
    }
  }, []);

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
  ];
  return (
    <div>
      <Card>
        <TableAdmin
          data={dataTable}
          columns={columnsCard as any}
          prop={{ atm: false }}
        />
      </Card>
    </div>
  );
};

export default ListATMKH;
