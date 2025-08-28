"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../../../components/core/SearchBar';
import RecipeList from '../../../components/core/RecipeList';
import CategoryFilter from '../../../components/features/CategoryFilter';
import FavoritesLink from '../../../components/features/Favorites';
import RandomRecipe from '../../../components/features/RandomRecipe';
import { useToast } from '@/context/ToastContext';

export default function CategoryPage({ params }) {
  const unwrappedParams = React.use(params);
  const categoryName = decodeURIComponent(unwrappedParams.categoryName);
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    setFavorites(savedFavorites);
    fetchRecipesByCategory(categoryName);
  }, [categoryName]);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const fetchRecipesByCategory = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (!res.ok) throw new Error('Filter failed!');
      const data = await res.json();

      if (data.meals) {
        const detailedRecipes = await Promise.all(
          data.meals.slice(0, 12).map(async (meal) => {
            const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailData = await detailRes.json();
            return detailData.meals[0];
          })
        );
        setRecipes(detailedRecipes);
        showToast(`Found ${detailedRecipes.length} ${category} recipes!`, 'success');
      } else {
        setRecipes([]);
        showToast(`No ${category} recipes found.`, 'info');
      }
    } catch (err) {
      setError(err.message);
      setRecipes([]);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newSearchTerm) => {
    if (newSearchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(newSearchTerm.trim())}`);
    }
  };

  const handleFilterByCategory = (newCategory) => {
    if (newCategory) {
      router.push(`/category/${newCategory}`);
    }
  };

  const handleSaveFavorite = (recipeId) => {
    let updatedFavorites;
    if (favorites.includes(recipeId)) {
      updatedFavorites = favorites.filter(id => id !== recipeId);
      showToast('Removed from favorites', 'info');
    } else {
      updatedFavorites = [...favorites, recipeId];
      showToast('Added to favorites!', 'success');
    }
    setFavorites(updatedFavorites);
    saveToLocalStorage('recipeFavorites', updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 hero-gradient">Recipe Finder</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Showing recipes for "{categoryName}"</p>
        </div>

        <SearchBar onSearch={handleSearch} disabled={loading} />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
          <CategoryFilter onFilter={handleFilterByCategory} disabled={loading} />
          <RandomRecipe />
          <FavoritesLink />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-10 text-red-500 text-lg">
            Oops! Something went wrong.
          </div>
        )}

        {!loading && !error && (
          <RecipeList
            recipes={recipes}
            favorites={favorites}
            onSave={handleSaveFavorite}
          />
        )}
      </div>
    </div>
  );
}