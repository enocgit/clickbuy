"use client";
import { useState, createContext } from "react";

type Props = {};

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const categoryList: string[] = [];
  const [category, setCategory] = useState("");

  const addCategory = (name: string) => {
    setCategory(name);
    if (categoryList.indexOf(name) === -1){
        categoryList.unshift(name);
    }
    if (categoryList.length === 3) {
      categoryList.pop();
    }
  };

  return (
    <CategoryContext.Provider value={{ category, categoryList, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};