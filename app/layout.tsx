import type { Metadata } from "next";
import { Poppins, Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Search for recipes by ingredients, cuisine, or keywords.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${vazirmatn.variable}`}>
      <body className="bg-foodCream text-foodDark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow  dark:bg-black/15">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
