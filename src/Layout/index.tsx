import React, { useState } from "react";
import {
  BankOutlined,
  DesktopOutlined,
  FileOutlined,
  LaptopOutlined,
  LineChartOutlined,
  NotificationOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Card, Dropdown, Layout, Menu, theme } from "antd";
import TableAdmin from "../Components/Table";
import Home from "../Pages/QlTheATM/Home";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../Pages/Login/utils/auth";
import { toast } from "react-toastify";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LayoutAdmin: React.FC = () => {
  const user = getUser();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const breadcrumbNameMap: Record<string, string> = {
    "/home": "Quản lý thẻ ATM",
    "/home3": "Quản lý nhân viên",
    "/atmKH": "Danh sách thẻ ATM của Khách hàng",
    "/addAccount": "Thêm mới tài khoản",
    "/listAtm": "Thẻ của tôi",
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    {
      title: "Home",
    },
    ...(pathSnippets.length
      ? [
          {
            title: breadcrumbNameMap[`/${pathSnippets[0]}`] || pathSnippets[0],
          },
        ]
      : []),
  ];

  const items: MenuItem[] = [
    user?.role === "personnel" &&
      getItem("Quản lý thẻ ATM", "/home", <LineChartOutlined />),

    user?.role === "personnel" &&
      getItem("Quản lý nhân viên", "/home3", <UserOutlined />),

    user?.role === "personnel" &&
      getItem(
        "List ATM theo KH",
        "/atmKH",
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    user?.role !== "personnel" &&
      getItem(
        "Thẻ của tôi",
        "/listAtm",
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    user?.role === "personnel" &&
      getItem("Thêm mới Account", "/addAccount", <UserOutlined />),
  ].filter(Boolean) as MenuItem[];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const itemss: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="grid border-b p-3 text-center">
          <span>{user ? user?.HOTEN : "Admin"}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: <span>Setting</span>,
      disabled: true,
    },

    {
      key: "4",
      danger: true,
      label: (
        <button
          onClick={() => {
            toast.success("Đăng xuất thành công!");
            navigate("/login");
            localStorage.clear();
          }}
        >
          {" "}
          Đăng xuất
        </button>
      ),
    },
  ];
  return (
    <Layout>
      <header className="bg-white  flex text-center items-center justify-between p-4">
        <div className="relative group">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide leading-tight transition-all duration-500 ease-in-out group-hover:text-[#1677ff]">
            <span className="inline-block animate-gradient bg-gradient-to-r from-[#1677ff] via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ATM
            </span>
            <div className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-[#1677ff] via-purple-500 to-pink-500 rounded opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </h1>
        </div>
        <div className="">
          <Dropdown menu={{ items: itemss }}>
            <div className="items-center flex text-center bg-[#F5F5F5] p-2 px-6 rounded-lg">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <h4 className="px-4">{user?.HOTEN}</h4>
            </div>
          </Dropdown>
        </div>
      </header>
      <Layout>
        <Sider
          theme="light"
          style={{ background: "white" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical " />
          <Menu
            onClick={({ key }) => navigate(key)}
            theme="light"
            style={{ background: "white" }}
            className="bg-white"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />

          <Content
            style={{
              margin: 0,
              minHeight: "100vh",
              background: "#0000000",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
