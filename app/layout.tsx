// import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
import { ThemeProvider } from "../contexts/ThemeProvider";
import AuthProvider from "@/contexts/AuthProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DrawerProvider } from "@/contexts/DrawerContext";

const inter = Inter({ subsets: ["cyrillic"] });

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
        <ThemeProvider>
          <DrawerProvider>
            <AuthProvider>
              <div className="dark:bg-neutral-900 dark:text-white">
                <Header />
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
