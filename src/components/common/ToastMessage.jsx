import { Toast, ToastToggle } from "flowbite-react";
import { FavIcon } from "./FavIcon";

export function ToastMessage({ message, type = "success" }) {
    return (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
            <Toast className="
                w-full max-w-sm
                rounded-2xl
                border border-gray-200/70 dark:border-zinc-800
                bg-white/90 dark:bg-zinc-950/90
                backdrop-blur-md
                shadow-sm dark:shadow-xl
                py-2 px-3
                transition-all duration-200
            ">
                <FavIcon containerSize={8} iconSize={20} />
                <div className="me-3 text-sm font-medium font-inter text-gray-700 dark:text-gray-200">
                    {message}
                </div>
                <ToastToggle
                    className="
                    ms-auto
                    text-gray-400 hover:text-red-500
                    transition
                    hover:cursor-pointer
                    rounded-full
                    dark:bg-zinc-950
                " />

            </Toast>

        </div>
    );
}