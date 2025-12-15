"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Hotel } from "@/types/Hotel";
import StyledSpin from "@/components/ui/StyledSpin";
import { Comment } from "@/types/Comment";
import { staticHotels } from "@/app/api/hotels/data";

export default function HotelDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const found = staticHotels.find((h) => h.id === id);
    if (!found) {
      router.replace("/");
      return;
    }
    setHotel(found);
  }, [id, router]);

  useEffect(() => {
    fetch(`/api/comments?count=10`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error(err))
      .finally(() => setLoadingComments(false));
  }, []);

  if (!hotel) return <StyledSpin />;

  return (
    <div
      style={{ maxWidth: 1000, margin: "0 auto", padding: 20, color: "#fff" }}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <div
          style={{
            width: 400,
            height: 300,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image
            src={hotel.image_url}
            alt={hotel.title}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </div>

        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
        >
          <h1 style={{ margin: 0 }}>{hotel.title}</h1>
          <p style={{ margin: 0 }}>Rating: {hotel.rating} / 5</p>
          <p style={{ margin: 0 }}>Price per night: $120</p>
          <p style={{ color: "#ccc", marginTop: 8 }}>{hotel.description}</p>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2>Comments</h2>
        {loadingComments ? (
          <StyledSpin />
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comments.map((c) => (
              <li
                key={c.id}
                style={{
                  marginBottom: 16,
                  padding: 12,
                  backgroundColor: "#222",
                  borderRadius: 8,
                }}
              >
                <strong>{c.title}</strong>
                <p style={{ margin: "4px 0" }}>{c.comment}</p>
                <small style={{ color: "#888" }}>
                  {new Date(c.date).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
