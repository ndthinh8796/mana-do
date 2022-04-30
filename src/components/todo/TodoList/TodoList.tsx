import React from "react";
import Checkbox from "src/components/ui/Checkbox";
import { Todo } from "src/models/todo";
import { isTodoCompleted } from "src/utils";

export interface TodoListProps {
  todos: Todo[];
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => void;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList = ({
  todos,
  onUpdateTodoStatus,
  onToggleAllTodo,
  onDeleteTodo,
}: TodoListProps) => {
  return (
    <>
      <div className="ToDo__list">
        {todos.length > 0 ? (
          <Checkbox
            className="Action__btn"
            onChange={(e) => onToggleAllTodo(e)}
          />
        ) : (
          <div />
        )}
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <Checkbox
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
