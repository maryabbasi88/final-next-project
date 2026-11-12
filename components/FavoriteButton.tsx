"use client";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useFavorites } from "../contex/FavoritesContext";

interface RecipeItem {
  id: number | string;
  title: string;
  image?: string;
}

export default function FavoriteButton({ recipe }: { recipe: RecipeItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
<button
onClick={() => toggleFavorite(recipe)}
className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm ${
favorite
? "bg-red-500 text-white hover:bg-red-600"
: "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
}`}
>
{favorite ? <FaBookmark /> : <FaRegBookmark />}
<span>{favorite ? "ذخیره شد" : "ذخیره در علاقه‌مندی‌ها"}</span>
</button>
  );
}
