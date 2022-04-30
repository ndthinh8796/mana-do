import React, { forwardRef, InputHTMLAttributes } from "react";

const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <>
      <input ref={ref} {...props} type="checkbox" />
    </>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
