import React from "react";


export const Button = ({
    className = "",
    variant = "default",
    size = "md",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        default:
            "bg-orange-500 text-white hover:bg-orange-600",
        outline:
            "border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
        ghost:
            "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
        danger:
            "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            className={`
                ${baseStyles} 
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        />
    );
};