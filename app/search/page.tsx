import { searchRecipes } from "@/lib/spoonacular"; 
import SearchControls from "./SearchControls";
import RecipeCard from "../../components/RecipeCard";

export interface Recipe {
  id: number;
  title: string;
  image?: string;
  imageType?: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  healthScore?: number;
  pricePerServing?: number;
  cheap?: boolean;
  dairyFree?: boolean;
  glutenFree?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
}

interface PageProps {
  searchParams: Promise<{
    q?: string;
    cuisine?: string;
    diet?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const query = params.q || "";
  const cuisine = params.cuisine || "";
  const diet = params.diet || "";
  const sort = params.sort || "popularity";
  const currentPage = Number(params.page) || 1;
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  let recipes: Recipe[] = [];
  let totalResults = 0;
  let errorMessage = "";

  try {
    const data = await searchRecipes({
      query,
      cuisine,
      diet,
      sort,
      number: pageSize,
      offset,
    });

    recipes = data.results || [];
    totalResults = data.totalResults || 0;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    errorMessage = "خطا در دریافت اطلاعات از سرور. لطفاً دوباره تلاش کنید.";
  }

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
          {query ? (
            <>
              نتایج جستجو برای: <span className="text-orange-500">{query}</span>
            </>
          ) : (
            "همه دستورهای پخت"
          )}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {errorMessage
            ? "خطا در بارگذاری"
            : `${totalResults} دستور پخت یافت شد`}
        </p>
      </header>

      <SearchControls
        cuisine={cuisine}
        diet={diet}
        sort={sort}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {errorMessage ? (
        <div className="rounded-2xl bg-red-50 p-4 text-center text-red-600">
          {errorMessage}
        </div>
      ) : recipes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <p className="text-lg font-medium text-gray-600">
            دستور پختی با این مشخصات یافت نشد.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}
