// File: components/ui/input.tsx
"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="border border-gray-300 rounded px-3 py-2 w-full"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
