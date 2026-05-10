import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export const CheckBox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={`grid place-content-center h-4 w-4 shrink-0 rounded-full
        border border-orange-500 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:cursor-not-allowed disabled:opacity-50
        data-[state=checked]:bg-orange-500 data-[state=checked]:text-white
        ${className}`}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

CheckBox.displayName = "CheckBox";