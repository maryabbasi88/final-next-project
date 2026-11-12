"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface FavoriteRecipe {
  id: number | string;
  title: string;
  image?: string;
  readyInMinutes?: number;
}

interface FavoritesContextType {
  favorites: FavoriteRecipe[];
  isFavorite: (id: number | string) => boolean;
  toggleFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (id: number | string) => void;
  clearAll: () => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [localRead, setLocalRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch (err) {
      console.error("خطا در خواندن علاقه‌مندی‌ها:", err);
    } finally {
      setLocalRead(true);
    }
  }, []);

  useEffect(() => {
    if (!localRead) return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("خطا در ذخیره‌سازی:", err);
    }
  }, [favorites, localRead]);

  const toggleFavorite = (recipe: FavoriteRecipe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(recipe.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(recipe.id));
      }
      return [...prev, recipe];
    });
  };

  const removeFavorite = (id: number | string) => {
    setFavorites((prev) =>
      prev.filter((item) => String(item.id) !== String(id)),
    );
  };

  const clearAll = () => setFavorites([]);

  const isFavorite = (id: number | string) =>
    favorites.some((item) => String(item.id) === String(id));

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAll,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
}
