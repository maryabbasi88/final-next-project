"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUtensils, FaHeart } from "react-icons/fa";
import { HiHome, HiInformationCircle } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: HiHome },
    { name: "Favorites", href: "/favorites", icon: FaHeart },
    { name: "About", href: "/about", icon: HiInformationCircle },
  ];

  return (
    <header className="bg-white/90 dark:bg-gray-900/90  sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 ">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 ">
            <FaUtensils className="text-base sm:text-lg" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-800 dark:text-white">
            Recipe<span className="text-orange-500">Finder</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="flex items-center gap-2 sm:gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  title={link.name} 
                  className={`flex items-center gap-1.5 p-2 sm:p-0 text-sm font-medium transition-colors hover:text-orange-500 dark:hover:text-orange-400 ${
                    isActive 
                      ? "text-orange-500 font-semibold bg-orange-500/10 sm:bg-transparent rounded-lg sm:rounded-none px-2.5 sm:px-0" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <Icon className="text-lg sm:text-base" />
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="h-5 sm:h-6 w-[1px] bg-gray-200 dark:bg-gray-700"></div>

          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}
