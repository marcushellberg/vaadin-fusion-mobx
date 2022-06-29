import { makeAutoObservable } from "mobx";
import Todo from "../generated/com/example/application/Todo";
import * as endpoint from "../generated/TodoEndpoint";
class Store {
  todos: Todo[] = [];
  constructor() {
    makeAutoObservable(this, { init: false });
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
    if (this.isNewTodo(todo)) {
      this.addTodo(saved);
    } else {
      this.updateTodo(saved);
    }
  }

  private todoExists(todo: Todo) {
    return this.todos.some((t) => t.id === todo.id);
  }

  private isNewTodo(todo: Todo) {
    return !this.todoExists(todo);
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
