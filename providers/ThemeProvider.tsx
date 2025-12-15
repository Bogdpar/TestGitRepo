"use client";

import { ConfigProvider, theme } from "antd";
import { ReactNode, useState, createContext } from "react";

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#8c52ff",
            fontFamily: "Inter, sans-serif",
            colorBgContainer: "#141414",
            colorBgBase: "#141414",
            colorText: "#fff",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
