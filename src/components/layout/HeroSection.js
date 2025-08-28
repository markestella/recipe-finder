"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); 

  const popularCategories = [
    'Pasta', 'Chicken', 'Dessert', 'Vegetarian', 'Seafood', 'Beef'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="hero-section min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient">
          Discover Amazing Recipes
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Find your next favorite meal from thousands of delicious recipes
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes..."
              className="flex-grow px-6 py-4 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg shadow-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-5 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full border border-gray-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍳</span>
            </div>
            <h3 className="font-semibold mb-2">Easy Recipes</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Quick and simple meals for busy days</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥗</span>
            </div>
            <h3 className="font-semibold mb-2">Healthy Options</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Nutritious meals for a balanced diet</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <h3 className="font-semibold mb-2">Chef Tips</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Professional techniques for better cooking</p>
          </div>
        </div>
      </div>
    </div>
  );
}