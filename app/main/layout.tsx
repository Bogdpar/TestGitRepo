import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels | My Platform",
  description: "Browse hotels and find your perfect stay",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
