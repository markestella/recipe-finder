import ThemeToggleButton from '../ThemeToggleButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass-effect shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            RecipeFinder
          </span>
        </div>
        <ThemeToggleButton />
      </div>
    </header>
  );
}