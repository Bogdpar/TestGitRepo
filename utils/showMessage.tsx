"use client";
import { message } from "antd";
import { useCallback } from "react";

export function useShowMessage() {
  const [msgApi, contextHolder] = message.useMessage();

  const showMsg = useCallback(
    (type: "success" | "error" | "info" | "warning", text: string) => {
      msgApi[type](text);
    },
    [msgApi]
  );

  return { showMsg, contextHolder };
}
