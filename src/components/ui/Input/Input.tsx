import React, { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <>
      <input ref={ref} {...props} />
    </>
  );
});

Input.displayName = "Input";

export default Input;
