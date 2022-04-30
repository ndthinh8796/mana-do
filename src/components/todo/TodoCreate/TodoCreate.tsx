import React, { useRef, useState } from "react";
import Input from "src/components/ui/Input";

export interface TodoCreateProps {
  onCreateTodo: (value: string) => void;
}

const TodoCreate = ({ onCreateTodo }: TodoCreateProps) => {
  const [err, setErr] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!!inputRef?.current?.value) {
        onCreateTodo(inputRef?.current?.value);
        setErr("");
      } else {
        setErr("To do can't be empty");
      }
    }
  };

  return (
    <>
      <div className="Todo__creation">
        <Input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>{err}</div>
    </>
  );
};

export default TodoCreate;
