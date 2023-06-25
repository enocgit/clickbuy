import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import ThemeWrapper from "./ThemeWrapper";

const inter = Inter({ subsets: ["cyrillic"]});

export const metadata = {
  title: "Clickbuy",
  description: "Where Shopping Perfection Begins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <ThemeWrapper>
          <div className="">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
