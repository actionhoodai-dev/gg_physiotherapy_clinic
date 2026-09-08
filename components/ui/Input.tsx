import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

function FieldWrapper({
  label,
  error,
  helper,
  required,
  id,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-700 tracking-wider uppercase"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
      {!error && helper && <span className="text-xs text-slate-500">{helper}</span>}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, required, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={inputId}>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full h-11 px-3.5 rounded-md border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e3b43] focus:border-transparent transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed",
            error && "border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helper, required, id, rows = 4, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={textareaId}>
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full p-3.5 rounded-md border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e3b43] focus:border-transparent transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed resize-y",
            error && "border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options?: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helper, required, id, options, children, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <FieldWrapper label={label} error={error} helper={helper} required={required} id={selectId}>
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "w-full h-11 px-3.5 rounded-md border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43] focus:border-transparent transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed",
            error && "border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
      </FieldWrapper>
    );
  }
);
Select.displayName = "Select";
