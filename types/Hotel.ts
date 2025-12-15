import { UploadFile } from "antd";

export type Hotel = {
  id: string;
  title: string;
  description: string;
  rating: number;
  country: string;
  city: string;
  image_url: string;
};

export interface HotelFormValues {
  title: string;
  description?: string;
  photo: UploadFile[];
  country?: string;
  city?: string;
  rating?: number;
}
