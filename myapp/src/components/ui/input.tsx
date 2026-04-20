import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  icon?: LucideIcon
  error?: string
}

function Input({ className, type, label, icon: Icon, error, id, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-foreground/80"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
        )}
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            "h-12 w-full min-w-0 rounded-xl border border-input bg-background px-4 py-1 text-foreground transition-all outline-none placeholder:text-muted-foreground/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 disabled:opacity-50",
            Icon && "pl-11",
            error && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[12px] font-medium text-destructive">{error}</span>
      )}
    </div>
  )
}

export { Input }
