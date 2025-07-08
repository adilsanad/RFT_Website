import * as React from "react"
import { cn } from "@/lib/utils" // This should merge classnames

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light" | "dark" | "footer" | "defaultnobg" ;
  size?: "default" | "compact" | "footer";
  loading?: boolean;
  icon?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = " font-medium tracking-tight border-2 flex items-center justify-center gap-2 transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-primary-500 text-primary-900 border-primary-900 hover:bg-primary-400 hover:translate-y-[2px] ",
      defaultnobg: "bg-transparent text-primary-900 border-opacity-0 hover:bg-primary-400 hover:translate-y-[2px] ",
      light: "bg-primary-100 text-primary-700 border-primary-700 hover:bg-primary-200 hover:translate-y-[2px]",
      dark: "bg-primary-900 text-primary-600 border-primary-900",
      footer: "bg-[#202020] text-primary-600 border-white/15 hover:bg-primary-900 hover:translate-y-[2px]",
    }

    const sizes = {
      default: "px-7 py-3 rounded-xl text-xl",
      compact: "px-4 py-1.5 rounded-lg text-md",
      lg: "text-lg",
      footer: " p-4 rounded-[15px]",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="animate-spin rounded-full border-2 border-t-transparent border-current w-5 h-5" />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "Button"
export { Button }
