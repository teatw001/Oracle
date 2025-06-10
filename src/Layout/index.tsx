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
import { Avatar, Breadcrumb, Card, Layout, Menu, theme } from "antd";
import TableAdmin from "../Components/Table";
import Home from "../Pages/QlTheATM/Home";
import { Outlet, useNavigate } from "react-router-dom";

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
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem("Quản lý thẻ ATM", "/home", <LineChartOutlined />),
    // getItem("Option 2", "/home2", <BankOutlined />),
    getItem("Quản lý nhân viên", "/home3", <UserOutlined />),
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <div className="items-center flex text-center bg-[#F5F5F5] p-2 px-6 rounded-lg">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <h4 className="px-4">Admin</h4>
          </div>
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
          <Breadcrumb
            items={[{ title: "Home" }, { title: "Quản lý thẻ ATM" }]}
            style={{ margin: "16px 0" }}
          />
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
