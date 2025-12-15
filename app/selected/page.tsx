"use client";
import { RootState, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import HotelCard from "@/components/hotel/HotelCard";
import HotelFilters from "@/components/hotel/HotelFilters";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import StyledSpin from "@/components/ui/StyledSpin";
import { Hotel } from "@/types/Hotel";

export default function SelectedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.hotels
  );
  const [filteredFavorites, setFilteredFavorites] =
    useState<Hotel[]>(favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
      return;
    }
    setFilteredFavorites(favorites);
    setLoading(false);
  }, [user, router, favorites]);

  if (!user || loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <StyledSpin />
      </div>
    );

  if (!favorites || favorites.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontSize: 18,
          color: "#666",
        }}
      >
        You don’t have any favorite hotels yet 💔
      </div>
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
      <HotelFilters hotels={favorites} onFilter={setFilteredFavorites} />

      {filteredFavorites.map((hotel) => (
        <div key={hotel.id} style={{ width: "60%" }}>
          <HotelCard
            hotel={hotel}
            onClick={() => router.push(`/hotelDetails/${hotel.id}`)}
          />
        </div>
      ))}
    </div>
  );
}
