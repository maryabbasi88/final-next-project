import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeDetails } from "@/lib/spoonacular";
import FavoriteButton from "../../../components/FavoriteButton";
import Image from "next/image";
import { FaRegClock, FaUserFriends, FaArrowRight } from "react-icons/fa";

interface RecipePageProps {
  params: {
    id: string;
  };
}
export interface Recipe {
  id: number | string;
  title: string;
  image?: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  instructions?: string;
  analyzedInstructions?: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  extendedIngredients?: Array<{
    id: number;
    original: string;
    amount: number;
    unit: string;
  }>;
}

export interface Ingredient {
  id: number;
  original: string;
  amount: number;
  unit: string;
}

export interface Step {
  number: number;
  step: string;
}

export interface InstructionGroup {
  steps: Step[];
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  let recipe: Recipe | null = null;

  try {
    recipe = await getRecipeDetails(params.id);
    console.log("recipe", recipe);
  } catch (error) {
    console.error(error);
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" dir="rtl">
      <Link
        href="/search"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 mb-6 transition-colors"
      >
        <FaArrowRight /> بازگشت به جستجو
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-inner bg-gray-100">
          <Image
            width={200}
            height={100}
            src={recipe.image||"https://placehold.co/400x300?text=No+Image"}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1.5">
                <FaRegClock className="text-orange-500" />{" "}
                {recipe.readyInMinutes || 0} دقیقه
              </span>
              <span className="flex items-center gap-1.5">
                <FaUserFriends className="text-green-600" />{" "}
                {recipe.servings || 1} نفر
              </span>
            </div>
          </div>

          <FavoriteButton
            recipe={{
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-orange-200">
              🛒 مواد لازم
            </h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              {recipe.extendedIngredients?.map(
                (item: Ingredient, idx: number) => (
                  <li
                    key={item.id || idx}
                    className="flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0" />
                    <span>{item.original}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              👨‍🍳 مراحل تهیه
            </h2>
            {recipe.analyzedInstructions?.[0]?.steps &&recipe.analyzedInstructions?.[0]?.steps?.length > 0 ?(
              <ol className="space-y-4 text-gray-700 text-sm">
                {recipe.analyzedInstructions[0].steps.map((stepItem: Step) => (
                  <li key={stepItem.number} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs shrink-0 mt-0.5">
                      {stepItem.number}
                    </span>
                    <span className="leading-relaxed">{stepItem.step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    recipe.instructions || "دستورالعمل متنی ثبت نشده است.",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
