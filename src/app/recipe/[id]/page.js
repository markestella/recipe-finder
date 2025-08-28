import Link from 'next/link';

async function getRecipeDetails(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export default async function RecipeDetailPage({ params }) {
  const recipe = await getRecipeDetails(params.id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Recipe not found</h1>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to All Recipes
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.strCategory}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{recipe.strMeal}</h1>
              <div className="text-gray-600 dark:text-gray-400 mb-6 flex flex-wrap gap-3">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  {recipe.strCategory}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {recipe.strArea}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4a2 2 0 11-4 0 2 2 0 014 0zM4 6a2 2 0 100 4h16a2 2 0 100-4H4z" />
                  </svg>
                  Ingredients
                </h2>
                <ul className="ingredient-list grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.map((item, index) => (
                    <li key={index} className="flex items-start bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="bg-amber-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.measure} {item.ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {recipe.strInstructions}
              </p>
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="p-8 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}