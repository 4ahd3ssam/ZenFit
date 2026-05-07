import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export const DropDown = ({
    value,
    onValueChange,
    placeholder = "Select option",
    options = [],
    className = "",
}) => {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className={
                    `
                    flex h-10 w-full items-center justify-between
                    rounded-lg border shadow-sm
                    bg-white dark:bg-zinc-900
                    border-gray-200 dark:border-zinc-800
                    text-gray-800 dark:text-white
                    px-3 py-2 text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-orange-400/40
                    transition ${className}
                    `
                }
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="
                        z-50 min-w-[8rem] overflow-hidden
                        rounded-lg border shadow-xl
                        bg-white dark:bg-zinc-900
                        border-gray-200 dark:border-zinc-800
                        animate-in fade-in-0 zoom-in-95
                    "
                >
                    <Select.Viewport className="p-1">
                        {options.map((opt) => (
                            <Select.Item
                                key={opt.value}
                                value={opt.value}
                                className="
                                    relative flex items-center
                                    rounded-md px-3 py-2 text-sm
                                    cursor-pointer select-none
                                    hover:bg-gray-100 dark:hover:bg-zinc-800
                                    transition duration-200
                                    text-gray-700 dark:text-zinc-300
                                    "
                            >
                                <Select.ItemIndicator className="absolute right-2">
                                    <Check className="h-4 w-4 text-orange-500" />
                                </Select.ItemIndicator>

                                <Select.ItemText>{opt.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};