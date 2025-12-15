"use client";

import { useState, useEffect } from "react";
import { Input, Button, Card, Typography, Space } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useShowMessage } from "@/utils/showMessage";
import StyledSpin from "@/components/ui/StyledSpin";

const { Title } = Typography;

export default function AuthPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const { showMsg, contextHolder } = useShowMessage();

  useEffect(() => {
    if (user) router.replace("/main");
  }, [user, router]);

  const handleLogin = async () => {
    if (!name.trim() || !pass.trim()) {
      showMsg("error", "Please fill in all fields");
      return;
    }

    if (pass.length < 8) {
      showMsg("error", "Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      login({ name, pass });
    } catch {
      showMsg("error", "Login failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  if (user)
    return (
      <>
        {contextHolder}
        <StyledSpin />
      </>
    );

  return (
    <>
      {contextHolder}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#141414",
        }}
      >
        <Card
          style={{
            width: 350,
            padding: 24,
            backgroundColor: "#1f1f1f",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={3} style={{ textAlign: "center", color: "white" }}>
              Sign In
            </Title>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Input
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              <Input.Password
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                disabled={loading}
              />
              <Button
                type="primary"
                block
                onClick={handleLogin}
                loading={loading}
              >
                Sign In
              </Button>
            </Space>
          </Space>
        </Card>
      </div>
    </>
  );
}
