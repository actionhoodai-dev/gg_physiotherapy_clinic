import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer";

    const variants = {
      primary:
        "bg-[#0e3b43] text-white hover:bg-[#092b31] focus-visible:ring-[#0e3b43] shadow-sm",
      secondary:
        "bg-[#0d9488] text-white hover:bg-[#0f766e] focus-visible:ring-[#0d9488] shadow-sm",
      outline:
        "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-[#0e3b43]",
      ghost:
        "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#20bd5a] focus-visible:ring-[#25D366] shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs tracking-wide",
      md: "h-11 px-5 text-sm tracking-wide",
      lg: "h-13 px-7 text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
