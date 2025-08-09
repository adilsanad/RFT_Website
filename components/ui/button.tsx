'use client';
import * as React from "react"
import { cn } from "@/lib/utils" // This should merge classnames
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect, useState } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light" | "dark" | "footer" | "defaultnobg" ;
  size?: "default" | "compact" | "footer";
  loading?: boolean;
  icon?: string;
  link?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, disabled, children, link, ...props }, ref) => {
    const baseStyles = "font-neulissans font-medium tracking-tight border-2 flex items-center justify-center gap-2 transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-primary-500 text-primary-900 border-primary-900 hover:bg-primary-400 hover:translate-y-[2px] ",
      defaultnobg: "bg-transparent text-primary-900 border-0 hover:bg-primary-400 hover:translate-y-[2px] ",
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

    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (link === 'back' && mounted) {
        // If we're on a product page, navigate back to products page to restore state
        if (window.location.pathname.includes('/products/') && !window.location.pathname.endsWith('/products')) {
          router.push('/products');
        } else {
          router.back();
        }
      } else if (link && link !== 'back') {
        window.open(link, "_blank");
      } else if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
        onClick={handleClick}
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