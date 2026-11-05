
"use client";

import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface RecipeItem {
  id: number | string;
  title: string;
  image?: string;
}

export default function FavoriteButton({ recipe }: { recipe: RecipeItem }) {
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const list = JSON.parse(saved);
        const exists = list.some((item: RecipeItem) => String(item.id) === String(recipe.id));
        setIsFavorite(exists);
      } catch (e) {
        console.error("خطا در خواندن علاقه‌مندی‌ها", e);
      }
    }
  }, [recipe.id]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem("favorites");
    let list: RecipeItem[] = [];

    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch {
        list = [];
      }
    }

    const exists = list.some((item) => String(item.id) === String(recipe.id));

    if (exists) {
      list = list.filter((item) => String(item.id) !== String(recipe.id));
      setIsFavorite(false);
    } else {
      list.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(list));
  };



  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
      }`}
    >
      {isFavorite ? <FaBookmark className="text-lg" /> : <FaRegBookmark className="text-lg" />}
      <span>{isFavorite ? "ذخیره شد" : "ذخیره در علاقه‌مندی‌ها"}</span>
    </button>
  );
}
