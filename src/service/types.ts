import { Todo, TodoStatus } from "../models/todo";

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodoContent(id: string, content: string): Promise<void>;
  abstract updateTodoStatus(id: string, status: TodoStatus): Promise<void>;
  abstract deleteTodo(id: string): Promise<void>;
  abstract deleteAllTodos(): Promise<void>;
  abstract updateAllTodoStatus(status: TodoStatus): Promise<void>;
}

export type TodoResult = Record<string, Todo>;
