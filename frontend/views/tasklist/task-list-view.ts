import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
} from "lit-element";

import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-progress-bar";
import { Binder, field } from "@vaadin/form";
import TodoModel from "../../generated/com/example/application/TodoModel";
import Todo from "../../generated/com/example/application/Todo";
import * as endpoint from "../../generated/TodoEndpoint";

@customElement("task-list-view")
export class TaskListView extends LitElement {
  @internalProperty()
  private todos: Todo[] = [];
  private binder = new Binder(this, TodoModel);

  render() {
    const { model } = this.binder;

    return html`
      <h1>My tasks</h1>
      <div class="form">
        <vaadin-text-field ...=${field(model.task)}></vaadin-text-field>
        <vaadin-button theme="primary" @click=${this.addTask}
          >Add</vaadin-button
        >
      </div>
      <div class="tasks">
        ${this.todos.map(
          (todo) => html`
            <div class="todo">
              <vaadin-checkbox
                ?checked=${todo.done}
                @checked-changed=${(e: CustomEvent) =>
                  this.updateTodoStatus(todo, e)}
              ></vaadin-checkbox>
              ${todo.task}
            </div>
          `
        )}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.todos = await endpoint.getTodos();
  }

  async addTask() {
    await this.binder.submitTo(this.saveTodo);
    this.binder.clear();
  }

  updateTodoStatus(todo: Todo, e: CustomEvent) {
    todo.done = e.detail.value;
    this.saveTodo(todo);
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

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--lumo-space-l);
      }
    `;
  }
}
