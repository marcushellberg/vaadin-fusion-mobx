import { css, customElement, html, LitElement } from 'lit-element';

@customElement('task-list-view')
export class TaskListView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<div>Content placeholder</div>`;
  }
}
