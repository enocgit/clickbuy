// @ts-nocheck
"use client"

import baseURL from "@/baseUrl/baseUrl";
import useSWR  from "swr";

export const useCartProduct = (id: string) => {
    const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
    
    const { data, error, isLoading, mutate } = useSWR(
        `${baseURL}/api/products/${id}`,
      fetcher
    );

    return { data, error, isLoading, mutate}
    
}
