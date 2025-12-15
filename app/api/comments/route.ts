import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";
import type { Comment } from "@/types/Comment";

function makeHotel(): Comment {
  const id = faker.string.uuid();
  const title = `${faker.company.name()}`;
  const comment = faker.lorem.paragraphs({ min: 1, max: 2 });
  const date = faker.date.past({ years: 2 });

  return { id, title, comment, date };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Math.min(Number(searchParams.get("count")) || 10, 100);
  const hotels = Array.from({ length: count }, () => makeHotel());
  return NextResponse.json(hotels);
}
