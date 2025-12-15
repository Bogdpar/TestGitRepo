"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import TopbarMenu from "./TopbarMenu";
import { Layout } from "antd";
import AppFooter from "./AppFooter";
import { Provider } from "react-redux";
import { store } from "@/store";

const { Content } = Layout;

export default function UltimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Layout style={{ minHeight: "100vh" }}>
            <TopbarMenu />

            <Content>{children}</Content>

            <AppFooter />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
