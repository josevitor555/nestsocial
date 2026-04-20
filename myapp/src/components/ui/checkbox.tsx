import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string
}

function Checkbox({
  className,
  label,
  id,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <CheckboxPrimitive.Root
        id={id}
        data-slot="checkbox"
        className={cn(
          "peer relative size-5 shrink-0 rounded-md border-2 border-input bg-transparent transition-all outline-none focus-visible:ring-4 focus-visible:ring-primary/10 data-[state=checked]:border-primary data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-primary-foreground"
        >
          <CheckIcon className="size-3.5 stroke-[4]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium text-muted-foreground cursor-pointer select-none group-hover:text-foreground transition-colors"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
