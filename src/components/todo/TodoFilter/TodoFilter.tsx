import React from "react";
import { TodoStatus } from "src/models/todo";

export interface TodoFilterProps {
  onShowActive: () => void;
  onShowCompleted: () => void;
  onShowAll: () => void;
}

const TodoFilter = ({
  onShowActive,
  onShowAll,
  onShowCompleted,
}: TodoFilterProps) => {
  return (
    <>
      <div className="Todo__toolbar">
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={onShowAll}>
            All
          </button>
          <button className="Action__btn" onClick={onShowActive}>
            Active
          </button>
          <button className="Action__btn" onClick={onShowCompleted}>
            Completed
          </button>
        </div>
        {/* <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button> */}
      </div>
    </>
  );
};

export default TodoFilter;
