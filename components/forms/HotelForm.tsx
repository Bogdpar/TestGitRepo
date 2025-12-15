"use client";

import { useState } from "react";
import { Form, Input, InputNumber, Button, Upload } from "antd";
import type { UploadFile, UploadChangeParam } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { Hotel, HotelFormValues } from "@/types/Hotel";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useShowMessage } from "@/utils/showMessage";

interface HotelFormProps {
  onSubmit: (hotel: Hotel) => void;
}

export default function HotelForm({ onSubmit }: HotelFormProps) {
  const [form] = Form.useForm<HotelFormValues>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { showMsg, contextHolder } = useShowMessage();

  const handleFinish = (values: HotelFormValues) => {
    if (!values.photo || values.photo.length === 0) {
      showMsg("error", "Photo is required");
      return;
    }

    const newHotel: Hotel = {
      id: faker.string.uuid(),
      title: values.title,
      description: values.description || "",
      rating: values.rating || 0,
      country: values.country || "Unknown",
      city: values.city || "Unknown",
      image_url: imagePreview || "",
    };

    onSubmit(newHotel);

    showMsg("success", "Hotel added successfully!");
    form.resetFields();
    setImagePreview(null);
  };

  const handleUploadChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {" "}
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Hotel Name"
          name="title"
          rules={[{ required: true, message: "Please enter hotel name" }]}
        >
          <Input placeholder="Enter hotel name" />
        </Form.Item>

        <Form.Item
          label="Photo"
          name="photo"
          rules={[{ required: true, message: "Please upload hotel photo" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Select photo</Button>
          </Upload>
        </Form.Item>

        {imagePreview && (
          <div
            style={{
              marginBottom: 16,
              position: "relative",
              width: "100%",
              height: 200,
            }}
          >
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        )}

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Hotel description" rows={4} />
        </Form.Item>

        <Form.Item label="Country" name="country">
          <Input placeholder="Enter country" />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
