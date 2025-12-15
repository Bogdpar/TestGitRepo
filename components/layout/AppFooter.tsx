"use client";
import { useAuth } from "@/hooks/useAuth";
import { Layout, Typography, Space } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

export default function AppFooter() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#1f1f1f",
        color: "#fff",
        padding: "24px 50px",
      }}
    >
      <Space direction="vertical">
        <Text style={{ color: "#fff" }}>Hotel Platform ©2025</Text>
        <Text style={{ color: "#fff" }}>Email: contact@hotelplatform.com</Text>
        <Text style={{ color: "#fff" }}>Phone: +1 (555) 123-4567</Text>
        <Text style={{ color: "#fff" }}>
          Address: 123 Main Street, City, Country
        </Text>
      </Space>
    </Footer>
  );
}
