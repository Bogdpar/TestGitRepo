import AboutContent from "@/components/ui/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Hotel Platform",
  description:
    "Learn more about Hotel Platform — a modern solution for online hotel bookings and management.",
  keywords: [
    "hotel booking",
    "travel",
    "accommodation",
    "about hotel platform",
  ],
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#141414",
      }}
    >
      <AboutContent />
    </div>
  );
}
