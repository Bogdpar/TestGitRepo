"use client";

import { useRouter } from "next/navigation";
import { staticHotels } from "../api/hotels/data";
import HotelForm from "@/components/forms/HotelForm";

export default function AddHotelPage() {
  const router = useRouter();

  const handleAddHotel = (hotel: (typeof staticHotels)[number]) => {
    staticHotels.unshift(hotel);
    router.push("/");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        backgroundColor: "#1f1f1f",
        borderRadius: 12,
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Add New Hotel</h2>
      <HotelForm onSubmit={handleAddHotel} />
    </div>
  );
}
