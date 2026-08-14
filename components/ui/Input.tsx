import { Uitheme, inputStyles } from "@/lib/ui-theme";
import { focusRingStyles } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    theme?: Uitheme;
}

export function Input({
    className,
    type = "text",
    theme = "light",
    ...props
}: InputProps) {
    return (
        <input type={type}
            className={cn(
                "h-10 w-full rounded-xl border px-3.5 text-sm transition-[border-color, box-shadow]",
                inputStyles[theme],
                focusRingStyles[theme],
                "disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}></input>
    )
}