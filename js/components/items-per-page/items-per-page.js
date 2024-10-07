import { LitElement, html, css } from 'lit';

export class ItemsPerPage extends LitElement {
  static properties = {
    numberItems: { type: Array }
  };

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

  handleChange(event) {
    const selectedValue = Number(event.target.value);
    const itemsPerPageChangeEvent = new CustomEvent('items-per-page-change', {
      detail: { itemsPerPage: selectedValue },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(itemsPerPageChangeEvent);
  }
}

customElements.define('items-per-page', ItemsPerPage);
