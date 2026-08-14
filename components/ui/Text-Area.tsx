import { inputStyles, Uitheme } from "@/lib/ui-theme";
import { focusRingStyles } from "@/lib/ui-theme";
import { cn } from "@/lib/utils";
import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";
import React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    theme?: Uitheme
}

export function Textarea({
    className,
    theme = "light",
    ...props
}: TextAreaProps) {
    return (
        <textarea
            className={cn(
                "min-h-[88px]. w-full resize-y rounded-xl border px-3.5 py-3 text-sm transition-[border-color,box-shadow]",
                inputStyles[theme],
                focusRingStyles[theme],
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        ></textarea>
    )
}