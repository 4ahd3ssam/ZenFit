export const Label = ({ className = "", children, ...props }) => {
    return (
        <label
            className={`
        block mb-1 text-sm font-medium
        text-gray-700 dark:text-zinc-300
        ${className}
      `}
            {...props}
        >
            {children}
        </label>
    );
};