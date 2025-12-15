"use client";
import { Layout, Menu, Button, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const { Header } = Layout;

const menuItems = [
  { label: "Home", key: "/main" },
  { label: "Selected", key: "/selected" },
  { label: "Add Hotel", key: "/upload" },
  { label: "About Us", key: "/about" },
];

export default function TopbarMenu() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems.map((item) => ({
          key: item.key,
          label: <Link href={item.key}>{item.label}</Link>,
        }))}
        style={{ backgroundColor: "transparent" }}
      />

      <Space>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
}
