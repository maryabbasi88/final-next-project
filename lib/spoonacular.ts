// lib/spoonacular.ts
const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_SPOONACULAR_END_POINT;

export async function searchRecipes({
  query = "",
  cuisine = "",
  diet = "",
  sort = "popularity",
  number = 12,
  offset = 0,
}: {
  query?: string;
  cuisine?: string;
  diet?: string;
  sort?: string;
  number?: number;
  offset?: number;
}) {
  if (!API_KEY) {
    console.error("خطا: کلید API در فایل .env.local یافت نشد!");
    return { results: [], totalResults: 0 };
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    query,
    number: number.toString(),
    offset: offset.toString(),
    addRecipeInformation: "true",
  });

  if (cuisine) params.append("cuisine", cuisine);
  if (diet) params.append("diet", diet);
  if (sort) params.append("sort", sort);

  try {
    const res = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`);
    
    if (!res.ok) {
      console.error(`خطا از سرور Spoonacular (${res.status})`);
      return { results: [], totalResults: 0 };
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { results: [], totalResults: 0 };
  }
}

export async function getRecipeDetails(id: string) {
  if (!API_KEY) return null;

  try {
    const res = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
