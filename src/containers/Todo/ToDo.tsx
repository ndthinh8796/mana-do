import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "src/store/actions";
import Service from "src/service";
import { TodoStatus } from "src/models/todo";
import { TodoCreate, TodoFilter, TodoList } from "src/components/todo";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppState } from "src/hooks/useAppState";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppState();
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = useCallback(
    async (value: string) => {
      const resp = await Service.createTodo(value);
      dispatch(createTodo(resp));
    },
    [dispatch]
  );

  const onUpdateTodoStatus = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
      const checked = e.target.checked;
      dispatch(updateTodoStatus(todoId, checked));
      await Service.updateTodoStatus(
        todoId,
        checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      );
    },
    [dispatch]
  );

  const onToggleAllTodo = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      dispatch(toggleAllTodos(checked));
      await Service.updateAllTodoStatus(
        checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      );
    },
    [dispatch]
  );

  const onDeleteAllTodo = useCallback(async () => {
    dispatch(deleteAllTodos());
    await Service.deleteAllTodos();
  }, [dispatch]);

  const onDeleteTodo = useCallback(
    async (id: string) => {
      dispatch(deleteTodo(id));
      await Service.deleteTodo(id);
    },
    [dispatch]
  );

  const showActiveTodo = useCallback(() => {
    setShowing(TodoStatus.ACTIVE);
  }, []);

  const showCompletedTodo = useCallback(() => {
    setShowing(TodoStatus.COMPLETED);
  }, []);

  const showAllTodo = useCallback(() => {
    setShowing("ALL");
  }, []);

  const filteredTodos = useMemo(() => {
    if (showing === "ALL") return todos;
    return todos.filter((todo) => todo.status === showing);
  }, [showing, todos]);

  return (
    <div className="ToDo__container">
      <TodoCreate onCreateTodo={onCreateTodo} />
      <TodoFilter
        onShowActive={showActiveTodo}
        onShowCompleted={showCompletedTodo}
        onShowAll={showAllTodo}
        onDeleteAllTodo={onDeleteAllTodo}
      />
      <TodoList
        onToggleAllTodo={onToggleAllTodo}
        todos={filteredTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
};

export default ToDoPage;
