"use client";

import { useState, useEffect } from "react";
import { Input, Select, Slider, Space, Button } from "antd";
import { Hotel } from "@/types/Hotel";

const { Option } = Select;

interface HotelFiltersProps {
  hotels: Hotel[];
  onFilter: (filteredHotels: Hotel[]) => void;
}

export default function HotelFilters({ hotels, onFilter }: HotelFiltersProps) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCountries = Array.from(new Set(hotels.map((h) => h.country)));
    setCountries(uniqueCountries);
  }, [hotels]);

  useEffect(() => {
    if (country) {
      const filteredCities = Array.from(
        new Set(hotels.filter((h) => h.country === country).map((h) => h.city))
      );
      setCities(filteredCities);
    } else {
      const allCities = Array.from(new Set(hotels.map((h) => h.city)));
      setCities(allCities);
    }
  }, [country, hotels]);

  useEffect(() => {
    const handler = setTimeout(() => {
      let filtered = hotels;

      if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter((h) =>
          h.title.toLowerCase().includes(lowerSearch)
        );
      }

      if (country) filtered = filtered.filter((h) => h.country === country);
      if (city) filtered = filtered.filter((h) => h.city === city);
      if (rating > 0) filtered = filtered.filter((h) => h.rating >= rating);

      onFilter(filtered);
    }, 300);

    return () => clearTimeout(handler);
  }, [search, country, city, rating, hotels, onFilter]);

  const handleReset = () => {
    setSearch("");
    setCountry(null);
    setCity(null);
    setRating(0);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 16px",
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <Input
        placeholder="Search by hotel name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginRight: 16, height: 32 }}
        allowClear
      />

      <Space size="middle">
        <Select
          placeholder="Country"
          style={{ width: 120, height: 32 }}
          value={country || undefined}
          onChange={(value) => setCountry(value)}
          allowClear
        >
          {countries.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="City"
          style={{ width: 120, height: 32 }}
          value={city || undefined}
          onChange={(value) => setCity(value)}
          allowClear
        >
          {cities.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>

        <div style={{ width: 120 }}>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={rating}
            onChange={(value) => setRating(value)}
          />
        </div>

        <Button size="small" onClick={handleReset}>
          Reset
        </Button>
      </Space>
    </div>
  );
}
