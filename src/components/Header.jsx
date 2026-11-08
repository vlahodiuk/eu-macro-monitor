import { Sun, Moon } from "lucide-react";
const Header = ({ isDark, onToggleTheme }) => {
  return (
    <header>
      <h1 className="text-slate-900 dark:text-white text-3xl font-bold flex items-center justify-between gap-4">
        EU Macro Monitor
      </h1>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        European Economic Intelligence
      </p>
      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900
             hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800
             dark:text-white dark:hover:bg-slate-700"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Header;
