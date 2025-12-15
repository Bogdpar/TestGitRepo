import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import UltimateLayout from "@/components/layout/UltimateLayout";

export const metadata: Metadata = {
  title: "Hotel Platform",
  description: "Hotel booking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UltimateLayout>{children}</UltimateLayout>
      </body>
    </html>
  );
}
