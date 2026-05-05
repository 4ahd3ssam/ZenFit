import { useThemeStore } from "../../store/themeStore";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-3 rounded-full hover:bg-orange-500/10 dark:hover:bg-zinc-900 hover:cursor-pointer text-white
                 text-gray-800 dark:text-gray-200
                 transition"
        >
            {theme === "light" ? (
                <>
                    <Moon className="text-orange-500" size={20} />
                </>
            ) : (
                <>
                    <Sun size={20} />
                </>
            )}
        </button>
    );
};