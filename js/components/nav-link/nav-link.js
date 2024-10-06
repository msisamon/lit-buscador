import { LitElement, html } from 'lit';

export class NavLink extends LitElement {
    static properties = {
        href: { type: String },
    };

    constructor() {
        super();
        this.href = '#';
    }

    render() {
        return html`
      <li class="nav-item">
        <a class="nav-link" href="${this.href}">
          <slot></slot>
        </a>
      </li>
    `;
    }
}

customElements.define('nav-link', NavLink);
