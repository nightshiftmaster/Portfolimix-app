"use client";
import React from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const toggle = () => {
    return setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={mode}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
