// File: components/ui/button.tsx
"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      ref={ref}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;
