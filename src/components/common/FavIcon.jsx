import { Flame } from "lucide-react"

export const FavIcon = ({ containerSize = 10, iconSize = 5 }) => {
    return (
        <div className={`
                    w-${containerSize} h-${containerSize} me-3 
                    bg-gradient-to-br from-orange-400 to-orange-600 
                    dark:from-orange-500 dark:to-orange-700
                    border border-orange-300/40 dark:border-orange-400/30 
                    rounded-full flex items-center justify-center shadow-md
                `}>
            <Flame className={`text-white dark:text-zinc-900 w-${iconSize} h-${iconSize} drop-shadow-sm`} />
        </div>
    )

}