export const Card = ({ className = "", children, ...props }) => {
    return (
        <div
            className={`
                rounded-xl border shadow-sm
                bg-white dark:bg-zinc-900
                border-gray-200 dark:border-zinc-800
                text-gray-800 dark:text-white
                transition-all duration-200
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};