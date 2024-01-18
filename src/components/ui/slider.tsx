import { cn } from "@utils/ui";
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-20 w-full grow overflow-hidden bg-foreground/10">
      <SliderPrimitive.Range className="absolute h-full bg-primary/20" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[84px] w-2 rounded border border-foreground bg-primary-orange transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-24 w-1 bg-primary transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-[82px] w-2 rounded border border-foreground bg-primary-orange transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }