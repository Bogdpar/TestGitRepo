import { faker } from "@faker-js/faker";
import type { Hotel } from "@/types/Hotel";

function makeHotel(): Hotel {
  const id = faker.string.uuid();
  const title = `${faker.company.name()} ${faker.helpers.arrayElement([
    "Hotel",
    "Resort",
    "Suites",
    "Inn",
  ])}`;
  const description = faker.lorem.paragraphs({ min: 4, max: 5 });
  const rating = Math.round((Math.random() * 4 + 1) * 10) / 10;
  const country = faker.location.country();
  const city = faker.location.city();
  const image_url = `https://picsum.photos/seed/${encodeURIComponent(
    id
  )}/800/600`;

  return { id, title, description, rating, country, city, image_url };
}

export const staticHotels: Hotel[] = Array.from({ length: 50 }, () =>
  makeHotel()
);
