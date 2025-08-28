export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">RecipeFinder</h3>
            <p className="text-gray-600 dark:text-gray-400">Discover your next favorite meal</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400">
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>TheMealDB API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400">
                <li>Search Recipes</li>
                <li>Category Filter</li>
                <li>Favorites</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Developer</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400">
                <li>Portfolio Demo</li>
                <li>Open Source</li>
                <li>React Patterns</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} RecipeFinder App. A demo project for portfolio.</p>
        </div>
      </div>
    </footer>
  );
}