import React from "react";
import Checkbox from "src/components/ui/Checkbox";
import { Todo, TodoStatus } from "src/models/todo";
import { isTodoCompleted } from "src/utils";

export interface TodoListProps {
  todos: Todo[];
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => void;
}

const TodoList = ({ todos, onUpdateTodoStatus }: TodoListProps) => {
  return (
    <>
      <div className="ToDo__list">
        <Checkbox />
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <Checkbox
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button className="Todo__delete">X</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
