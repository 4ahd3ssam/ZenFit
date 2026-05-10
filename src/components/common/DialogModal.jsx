import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const DialogModal = ({ open, onOpenChange, title = "", description = "", isButton = false, actionTitle = "", action = () => { }, children }) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 bg-black/60 animate-fadeIn"
                />

                <Dialog.Content
                    className="
                        fixed top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2
                        w-[90vw] max-w-md max-h-[85vh]
                        p-6 rounded-xl
                        bg-white dark:bg-zinc-900
                        shadow-2xl
                        animate-popIn
                        focus:outline-none
                    "
                >
                    <Dialog.Close asChild>
                        <button
                            className="
                                absolute top-3 right-3
                                h-7 w-7 rounded-full
                                flex items-center justify-center
                                bg-gray-200 dark:bg-zinc-800
                                text-zinc-700 dark:text-zinc-300
                                hover:bg-orange-500/20
                                transition
                            "
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>

                    <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {title}
                    </Dialog.Title>

                    <Dialog.Description className="mt-2 mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                        {description}
                    </Dialog.Description>


                    {children}

                    {isButton && <div className="flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                onClick={action}
                                className="
                                    px-4 h-9 rounded-md
                                    bg-orange-500 text-white dark:text-zinc-950
                                    hover:bg-zinc-400 hover:cursor-pointer
                                    transition
                                "
                            >
                                {actionTitle}
                            </button>
                        </Dialog.Close>
                    </div>}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};