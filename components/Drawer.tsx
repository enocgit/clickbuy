// @ts-nocheck
"use client";
import { DrawerContext } from "@/contexts/DrawerContext";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import baseUrl from "@/baseUrl/baseUrl";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
// import { HomeIcon, PhoneIcon, FileQuestion } from "lucide-react"

const Drawer = () => {
  const session = useSession();
  const userID = session?.data?.user?.email;
  const { isShowing, handleCancelClick } = useContext(DrawerContext);
  const { toggleIcon } = useContext(ThemeContext);

  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `${baseUrl}/api/cart?userID=${userID}`,
    fetcher
  );
  return (
    <div
      className="fixed top-0 z-40 h-screen w-screen min-[317px]:w-40 lg:hidden"
      style={{ display: isShowing ? "block" : "none" }}
    >
      <div className="h-screen w-full min-[317px]:w-40">
        <ul className="menu menu-vertical relative h-full w-80 bg-white p-4 text-base-content dark:bg-neutral-800 dark:text-white">
          {/* Sidebar content here */}
          <li className="">
            <div className="relative inline">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={20} height={20} />
                <h1 className="inline font-[800] text-brand-accent">
                  ClickBuy
                </h1>
              </Link>
            </div>
          </li>
          <div
            className="absolute right-4 top-14"
            onClick={() => {
              handleCancelClick();
            }}
          >
            <X className="absolute bottom-2 right-2 ml-auto" />
          </div>
          <ul className="space-y-3">
            <li onClick={() => handleCancelClick()} className="mt-5">
              {/* <HomeIcon /> */}
              <Link href="/">Home</Link>
            </li>
            <li onClick={() => handleCancelClick()}>
              <Link href="/products">Products</Link>
            </li>
            <li onClick={() => handleCancelClick()}>
              <Link href="/categories">Categories</Link>
            </li>
            <li onClick={() => handleCancelClick()}>
              <Link href="/about">About Us</Link>
            </li>{" "}
            <li onClick={() => handleCancelClick()}>
              <Link href="/contact">Contact</Link>
            </li>
            <li
              onClick={() => handleCancelClick()}
              className="min-[420px]:hidden"
            >
              <Link href="/login">Login</Link>
            </li>
          </ul>
          <hr className="mb-5 mt-auto w-full border border-neutral-200" />
          <div className="mx-4 flex justify-between">
            <div onClick={() => handleCancelClick()} className="mt-auto">
              <Link href="/cart" className="relative cursor-pointer">
                <div className="indicator relative right-5">
                  <ShoppingCart className="ml-5" width="1.4rem" />
                  {session?.status === "authenticated" &&
                    data?.products?.length > 0 && (
                      <div className="badge badge-error badge-xs indicator-item"></div>
                    )}
                </div>
              </Link>
            </div>
            <div className="flex items-center">
              <label className="swap swap-rotate min-[320px]:hidden">
                <input type="checkbox" />

                {/* sun icon */}
                <svg
                  className="swap-on h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={toggleIcon}
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={toggleIcon}
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
