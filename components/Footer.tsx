import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

// type Social = {
//   id: string,
//   icon: string,
//   link: string
// }[]

const footerNav = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Products",
    link: "/products",
  },
  {
    id: 3,
    name: "Categories",
    link: "/categories",
  },
  {
    id: 4,
    name: "About Us",
    link: "/about",
  },
  {
    id: 5,
    name: "Contact",
    link: "/contact",
  },
];

const footerSocial = [
  {
    id: 1,
    src: "",
    alt: "facebook",
    link: "",
  },
  {
    id: 2,
    src: "",
    alt: "instagram",
    link: "",
  },
  {
    id: 3,
    src: "",
    alt: "snapchat",
    link: "",
  },
  {
    id: 4,
    src: "",
    alt: "twitter",
    link: "",
  },
];

const Footer = (props: Props) => {
  return (
    <footer className="mt-40 flex items-center justify-center bg-[#f9f9f9] px-10 pb-12 pt-8 text-center">
      <div className="space-y-16">
        <div className="flex flex-col items-center space-y-7">
          <Link href="/" className="flex gap-2">
            <Image src="/logo.svg" alt="Logo" width={20} height={20} />
            <h1 className="font-[800] text-brand_accent">Clickbuy</h1>
          </Link>
          <div className="flex flex-col flex-wrap items-center justify-center gap-6 min-[230px]:flex-row">
            {footerNav.map((nav) => (
              <Link key={nav.id} href={nav.link} className="text-xs">
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex gap-5">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
          <div className="text-xs">Copyright &copy; 2023</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
