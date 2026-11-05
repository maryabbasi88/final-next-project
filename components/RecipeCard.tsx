import Link from "next/link";
import Image from "next/image";
import { FaRegClock, FaUtensils } from "react-icons/fa";
import { Recipe } from "../app/search/page"; 

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-md">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {recipe.image ? (
            <Image
              width={300}
              height={200}
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              تصویر موجود نیست
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="mb-2 line-clamp-1 text-base font-bold text-gray-800 transition group-hover:text-orange-500">
            {recipe.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {recipe.summary || "دستور پخت خوشمزه با مواد اولیه تازه."}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 pt-0">
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaRegClock className="text-orange-500" />
            {recipe.readyInMinutes ? `${recipe.readyInMinutes} دقیقه` : "سریع"}
          </span>
        </div>

        <Link
          href={`/recipe/${recipe.id}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-orange-50 py-2.5 text-center text-sm font-medium text-orange-600 transition hover:bg-orange-500 hover:text-white"
        >
          <FaUtensils className="text-xs" />
          جزئیات بیشتر
        </Link>
      </div>
    </article>
  );
}
