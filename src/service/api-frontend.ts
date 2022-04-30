import { IAPI, TodoResult } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const newTodo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };
    localStorage.setItem(
      "todo",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("todo") || "{}"),
        [newTodo.id]: newTodo,
      })
    );
    return Promise.resolve(newTodo);
  }

  async getTodos(): Promise<Todo[]> {
    const todos: TodoResult = JSON.parse(localStorage.getItem("todo") || "{}");

    return Promise.resolve(Object.values(todos));
  }

  async updateTodoContent(id: string, content: string): Promise<void> {
    const todos: TodoResult = JSON.parse(localStorage.getItem("todo") || "{}");

    todos[id] = { ...todos[id], content };

    return Promise.resolve(localStorage.setItem("todo", JSON.stringify(todos)));
  }

  async updateTodoStatus(id: string, status: TodoStatus): Promise<void> {
    const todos: TodoResult = JSON.parse(localStorage.getItem("todo") || "{}");

    todos[id] = { ...todos[id], status };

    return Promise.resolve(localStorage.setItem("todo", JSON.stringify(todos)));
  }

  async updateAllTodoStatus(status: TodoStatus): Promise<void> {
    const todos: TodoResult = JSON.parse(localStorage.getItem("todo") || "{}");
    Object.keys(todos).forEach(
      (key) => (todos[key] = { ...todos[key], status })
    );
    return Promise.resolve(localStorage.setItem("todo", JSON.stringify(todos)));
  }

  async deleteTodo(id: string): Promise<void> {
    const todos: TodoResult = JSON.parse(localStorage.getItem("todo") || "{}");

    delete todos[id];

    return Promise.resolve(localStorage.setItem("todo", JSON.stringify(todos)));
  }

  async deleteAllTodos(): Promise<void> {
    return Promise.resolve(localStorage.setItem("todo", "{}"));
  }
}

export default new ApiFrontend();
