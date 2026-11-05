"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBookmark, FaTrash, FaUtensils, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface FavoriteRecipe {
  id: number | string;
  title: string;
  image?: string;
  readyInMinutes?: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("خطا در بارگذاری علاقه‌مندی‌ها:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = (id: number | string) => {
    const updated = favorites.filter((item) => String(item.id) !== String(id));
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm("آیا از پاک کردن کل لیست علاقه‌مندی‌ها مطمئن هستید؟")) {
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 text-sm">در حال بارگذاری لیست ذخیره‌شده‌ها...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 " dir="rtl ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold  text-gray-800 flex items-center gap-3">
            <FaBookmark className="text-orange-500 " />
            غذاهای مورد علاقه من
          </h1>
          <p className="text-gray-500 text-sm mt-1 ">
            {favorites.length > 0
              ? `${favorites.length} دستور غذایی ذخیره شده است`
              : "هنوز غذایی به لیست اضافه نکرده‌اید"}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-white border  border-red-200 hover:bg-red-500 px-3.5 py-2 rounded-xl transition duration-200 flex items-center gap-1.5"
          >
            <FaTrash /> پاک کردن همه
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 max-w-xl mx-auto px-6">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🍳
          </div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">لیست شما خالی است!</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            می‌توانید با جستجو در دستورهای پخت، غذاهای خوشمزه را علامت بزنید تا همیشه سریع به آن‌ها دسترسی داشته باشید.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 dark:text-white bg-orange-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-orange-600 transition shadow-sm"
          >
            جستجوی دستور غذا <FaArrowRight className="rotate-180 text-xs" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                 width={200}
                 height={100}
                  src={recipe.image || "https://placehold.co/400x300?text=No+Image"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemove(recipe.id)}
                  title="حذف از لیست"
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shadow transition"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>

              {/* مشخصات و لینک */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="font-bold text-gray-800 line-clamp-2 mb-4 group-hover:text-orange-500 transition">
                  {recipe.title}
                </h3>

                <Link
                  href={`/recipe/${recipe.id}`}
                  className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white font-medium text-sm transition"
                >
                  <FaUtensils className="text-xs" />
                  مشاهده دستور پخت
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
