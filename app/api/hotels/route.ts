import { NextResponse } from "next/server";
import { staticHotels } from "./data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Math.min(Number(searchParams.get("count")) || 10, 100);
  return NextResponse.json(staticHotels.slice(0, count));
}
