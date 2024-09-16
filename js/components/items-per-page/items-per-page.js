import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class ItemsPerPage extends LitElement {
    static properties = {
        numberItems: { type: Array }
    };

    handleChange(event) {
        const value = Number(event.target.value);
        this.dispatchEvent(new CustomEvent('items-per-page-change', {
            detail: { value }
        }));
    }

    render() {
        return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <div class="mb-3">
        <label for="items-per-page" class="form-label">Items per page:</label>
        <select class="form-select" id="items-per-page" @change="${this.handleChange}">
          ${this.numberItems.map(num => html`<option value="${num}">${num}</option>`)}
        </select>
      </div>
    `;
    }
}

customElements.define('items-per-page', ItemsPerPage);
