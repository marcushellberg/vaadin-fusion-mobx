import { makeAutoObservable } from "mobx";
import Todo from "./generated/com/example/application/Todo";
import * as endpoint from "./generated/TodoEndpoint";
class Store {
  todos: Todo[] = [];
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    this.setTodos(await endpoint.getTodos());
  }

  setTodos(todos: Todo[]) {
    this.todos = todos;
  }

  async saveTodo(todo: Todo) {
    const saved = await endpoint.saveTodo(todo);
    if (todo.id === 0) {
      this.addTodo(saved);
    } else {
      this.updateTodo(saved);
    }
  }

  private addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
  }

  private updateTodo(updated: Todo) {
    this.todos = this.todos.map((todo) =>
      updated.id === todo.id ? updated : todo
    );
  }

  get completedTodosCount() {
    return this.todos.filter((t) => t.done).length;
  }

  get totalTodosCount() {
    return this.todos.length;
  }

  get progress() {
    return this.completedTodosCount / this.totalTodosCount;
  }
}

export const store = new Store();
