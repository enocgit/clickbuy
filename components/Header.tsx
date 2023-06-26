"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import Drawer from "./Drawer";

type Props = {};

const Header = (props: Props) => {
  const session = useSession();
  const username = session?.data?.user?.name
  const [display, setDisplay] = useState<boolean>(false)

  const toggleProfileMenu = () => {
    setDisplay(prevState => !prevState)
  }

  return (
    <>
      <header className="navbar sticky top-0 z-20 flex border bg-white sm:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden" htmlFor="my-drawer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={20} height={20} />
            <h1 className="font-[800] text-brand-accent">Clickbuy</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1 text-xs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <details>
                <summary>Categories</summary>
                <ul className="p-2">
                  <li>
                    <Link href="">Electronics</Link>
                  </li>
                  <li>
                    <Link href="">Games</Link>
                  </li>
                  <li>
                    <Link href="/categories">View all</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>{" "}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            {/* Cart icon */}
            <Link href="/cart" className="relative cursor-pointer">
              <div className="indicator">
                <ShoppingCart className="ml-5" width="1.4rem" />
                <div className="badge badge-error badge-xs indicator-item"></div>
              </div>
            </Link>
          </ul>
        </div>
        <div className="navbar-end gap-8">
          {/* Toggle dark mode */}
          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" />

              {/* sun icon */}
              <svg
                className="swap-on h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          {session.status !== "authenticated" ? 
          <Link href="/login">
            <Button
              text="Login"
              className="btn-sm hidden rounded-lg text-xs capitalize min-[420px]:flex"
            />
          </Link> : 
          <></>
        }
            <div className="cursor-pointer flex items-center justify-center rounded-full p-4 text-xs bg-[#0097a9] text-white h-4 w-4" onClick={toggleProfileMenu}>{username?.slice(0, 1)}</div>
        </div>
      </header>
      <Drawer />

      <div className="text-xs absolute right-0 top-20 shadow-lg rounded-lg bg-white w-[150px] h-[120px] p-5" style={{display: display ? "block" : "none"}}>
        <p className="text-main-text">{username}</p>
        <div className="divider w-full"></div>
        <Link href="" className=" text-red-400 cursor-pointer" onClick={() => signOut()}>Sign out</Link>
      </div>
    </>
  );
};

export default Header;

