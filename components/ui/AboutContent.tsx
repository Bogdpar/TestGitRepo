"use client";

import { Card, Typography, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function AboutContent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#141414",
      }}
    >
      <Card
        style={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#1f1f1f",
          color: "#fff",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2} style={{ color: "#fff" }}>
            About Us
          </Title>

          <Paragraph style={{ color: "#ccc", fontSize: 16 }}>
            Hotel Platform is a modern solution for online hotel bookings. Our
            platform connects users and hotel owners, simplifying the process of
            searching, booking, and managing hotel rooms. We aim to make
            traveling convenient and accessible for everyone.
          </Paragraph>

          <Paragraph style={{ color: "#ccc", fontSize: 16 }}>
            Our goal is to create a transparent and reliable booking system
            where each user can quickly find the right hotel, and owners get a
            convenient tool to manage their listings.
          </Paragraph>

          <Card
            type="inner"
            title="Contact Us"
            style={{ backgroundColor: "#2a2a2a", color: "#fff" }}
          >
            <Space direction="vertical" size="middle">
              <Text style={{ color: "#fff" }}>
                Email: contact@hotelplatform.com
              </Text>
              <Text style={{ color: "#fff" }}>Phone: +1 (555) 123-4567</Text>
              <Text style={{ color: "#fff" }}>
                Address: 123 Main Street, City, Country
              </Text>
            </Space>
          </Card>

          <Paragraph style={{ color: "#ccc", fontSize: 16 }}>
            The platform was founded in 2025 by a group of enthusiasts aiming to
            make hotel booking simple and convenient for travelers worldwide.
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
}
