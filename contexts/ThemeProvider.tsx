"use client";
import { createContext, useState } from "react";

type ThemeValue = {
  lightIcon: boolean;
  toggleIcon: () => void;
};

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [lightIcon, setLightIcon] = useState<boolean>(true);

  const toggleIcon = () => {
    setLightIcon((prevState) => !prevState);
  };
  return (
    <ThemeContext.Provider value={{ lightIcon, toggleIcon }}>
      <div class={lightIcon ? "" : "dark"}>{children}</div>
    </ThemeContext.Provider>
  );
};
