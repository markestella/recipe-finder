"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../../../components/core/SearchBar';
import RecipeList from '../../../components/core/RecipeList';
import CategoryFilter from '../../../components/features/CategoryFilter';
import FavoritesLink from '../../../components/features/Favorites';
import RandomRecipe from '../../../components/features/RandomRecipe';
import SearchHistory from '../../../components/features/SearchHistory';
import { useToast } from '@/context/ToastContext';

export default function SearchPage({ params }) {
  const unwrappedParams = React.use(params);
  const searchTerm = decodeURIComponent(unwrappedParams.searchTerm);
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setFavorites(savedFavorites);
    setSearchHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchRecipes(searchTerm);
    }
  }, [searchTerm]);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const fetchRecipes = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/recipe?searchTerm=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed!');
      const data = await res.json();

      setRecipes(data.meals || []);

      setSearchHistory(prevHistory => {
        const updatedHistory = [
          query,
          ...prevHistory.filter(item => item !== query)
        ].slice(0, 10);

        saveToLocalStorage('searchHistory', updatedHistory);

        return updatedHistory;
      });

      if (!data.meals || data.meals.length === 0) {
        showToast('No recipes found. Try a different search!', 'info');
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

  const handleFilterByCategory = (category) => {
    if (category) {
      router.push(`/category/${category}`);
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

  const clearSearchHistory = () => {
    setSearchHistory([]);
    saveToLocalStorage('searchHistory', []);
    showToast('Search history cleared', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 hero-gradient">Recipe Finder</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover culinary delights</p>
        </div>

        <SearchBar onSearch={handleSearch} disabled={loading} initialValue={searchTerm} />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
          <CategoryFilter onFilter={handleFilterByCategory} disabled={loading} />
          <RandomRecipe />
          <FavoritesLink />
        </div>

        {searchHistory.length > 0 && (
          <SearchHistory
            history={searchHistory}
            onSearch={handleSearch}
            onClear={clearSearchHistory}
          />
        )}

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