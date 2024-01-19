import { ReactNode, useId } from "react";
import * as React from "react"

import { cn } from "@utils/ui"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn(
        "flex flex-row gap-2 items-center rounded-md border border-input h-10 w-full px-3 py-2",
        "focus-within:ring-2 focus-within:ring-ring/20 focus-within:ring-offset-0",
        "ring-offset-background",
        "text-sm ",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "flex bg-background",
        className
      )}>
        {leftIcon && <label htmlFor={id} className="">{leftIcon}</label>}
        <input
          id={id}
          type={type}
          className={cn(
            "bg-background",
            "focus-visible:outline-none",
            "w-full h-full",
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

TextInput.displayName = "Input"

export { TextInput }
