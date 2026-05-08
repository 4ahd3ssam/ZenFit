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
                
                dark:autofill:[-webkit-text-fill-color:white]
                dark:autofill:[-webkit-box-shadow:0_0_0px_1000px_rgb(24_24_27)_inset]
                dark:autofill:[box-shadow:0_0_0px_1000px_rgb(24_24_27)_inset]

                dark:autofill:border-zinc-800
                dark:autofill:bg-zinc-900

                [transition:background-color_9999s_ease-in-out_0s]
                dark:focus:border-orange-500 ${className}`}
            {...props} />
    )
}