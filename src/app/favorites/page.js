"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RecipeList from "../../components/core/RecipeList";
import { useToast } from "@/context/ToastContext";

export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("recipeFavorites")) || [];
    setFavorites(savedFavorites);

    if (savedFavorites.length === 0) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipePromises = savedFavorites.map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(
            (res) => res.json()
          )
        );
        const results = await Promise.all(recipePromises);
        const recipes = results
          .map((result) => result.meals[0])
          .filter(Boolean);
        setFavoriteRecipes(recipes);
      } catch (err) {
        setError("Could not load favorites.");
        showToast("Could not load favorites.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [showToast]); // ✅ added showToast dependency

  const handleSaveFavorite = (recipeId) => {
    let updatedFavorites;
    if (favorites.includes(recipeId)) {
      updatedFavorites = favorites.filter((id) => id !== recipeId);
      showToast("Removed from favorites", "info");
    } else {
      updatedFavorites = [...favorites, recipeId];
      showToast("Added to favorites!", "success");
    }
    setFavorites(updatedFavorites);
    setFavoriteRecipes(
      favoriteRecipes.filter((recipe) => updatedFavorites.includes(recipe.idMeal))
    );
    localStorage.setItem("recipeFavorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 hero-gradient">
            My Favorite Recipes
          </h1>
          <Link
            href="/"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to Search
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-10 text-red-500 text-lg">{error}</div>
        )}

        {!loading && !error && favoriteRecipes.length > 0 && (
          <RecipeList
            recipes={favoriteRecipes}
            favorites={favorites}
            onSave={handleSaveFavorite}
            pageContext="favorites"
          />
        )}

        {!loading && !error && favoriteRecipes.length === 0 && (
          <div className="text-center py-10">
            {/* ✅ Fixed unescaped quote using template literal */}
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {`You haven't saved any favorite recipes yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
