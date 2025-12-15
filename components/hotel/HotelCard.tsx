"use client";
import { Card, Rate, Typography } from "antd";
import Image from "next/image";
import { Hotel } from "@/types/Hotel";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { toggleFavorite } from "@/store/favoritesSlice";

const { Title, Paragraph, Text } = Typography;

interface HotelCardProps {
  hotel: Hotel;
  onClick?: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  const { title, description, rating, country, city, image_url, id } = hotel;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.hotels);

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(hotel));
  };

  return (
    <Card
      onClick={onClick}
      hoverable
      style={{
        width: "100%",
        backgroundColor: "#1f1f1f",
        color: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
      }}
      cover={
        <div style={{ position: "relative", width: "100%", height: 200 }}>
          {image_url ? (
            <Image
              src={image_url}
              alt={title || "Hotel"}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#888",
              }}
            >
              No Image
            </div>
          )}
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4} style={{ color: "#fff", marginBottom: 8 }}>
          {title || "Not specified"}
        </Title>

        {isFavorite ? (
          <HeartFilled
            onClick={handleToggleFavorite}
            style={{ color: "#fadb14", fontSize: 22, cursor: "pointer" }}
          />
        ) : (
          <HeartOutlined
            onClick={handleToggleFavorite}
            style={{ color: "#fff", fontSize: 22, cursor: "pointer" }}
          />
        )}
      </div>

      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{ color: "#ccc", fontSize: 14, minHeight: 42 }}
      >
        {description || "Not specified"}
      </Paragraph>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Rate
          disabled
          allowHalf
          defaultValue={rating || 0}
          style={{ color: "#fadb14" }}
        />
        <Text style={{ color: "#aaa", fontSize: 13 }}>
          {city || "Not specified"}, {country || "Not specified"}
        </Text>
      </div>
    </Card>
  );
}
