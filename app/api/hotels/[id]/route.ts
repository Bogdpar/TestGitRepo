import { NextResponse } from "next/server";
import { staticHotels } from "../data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const hotel = staticHotels.find((h) => h.id === id);
  if (!hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }
  return NextResponse.json(hotel);
}
