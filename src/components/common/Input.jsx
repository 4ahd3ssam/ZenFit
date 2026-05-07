export const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={
                `flex h-10 w-full rounded-lg
                border shadow-sm from-gray-100 via-white to-gray-100
                dark:zinc-950 border-gray-200 dark:border-zinc-800
                text-gray-800 dark:text-white
                px-3 py-2
                text-sm
                placeholder:text-gray-400 dark:placeholder:text-zinc-500
                transition-all duration-200
                focus:outline-none
                focus:ring-2 focus:ring-orange-400/40
                focus:border-orange-400
                dark:focus:border-orange-500 ${className}`}
            {...props} />
    )
}