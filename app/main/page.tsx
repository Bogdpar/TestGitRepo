"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";
import StyledSpin from "@/components/ui/StyledSpin";
import { Hotel } from "@/types/Hotel";
import HotelCard from "@/components/hotel/HotelCard";
import HotelFilters from "@/components/hotel/HotelFilters";
import { staticHotels } from "../api/hotels/data";

const PAGE_SIZE = 10;

export default function MainPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
      return;
    }
    setFilteredHotels(staticHotels);
    setLoading(false);
  }, [user, router]);

  if (!user || loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <StyledSpin />
      </div>
    );

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
      }}
    >
      <HotelFilters hotels={staticHotels} onFilter={setFilteredHotels} />

      {paginatedHotels.map((hotel) => (
        <div key={hotel.id} style={{ width: "60%" }}>
          <HotelCard
            hotel={hotel}
            onClick={() => router.push(`/hotelDetails/${hotel.id}`)}
          />
        </div>
      ))}

      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={filteredHotels.length}
        onChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
