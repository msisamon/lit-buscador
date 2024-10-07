import { LitElement, html, css } from 'lit';

export class BookTable extends LitElement {
  static styles = css`
    .pagination {
      margin: 20px 0;
    }
    .table-button {
      margin: 5px;
    }
  `;

  static properties = {
    books: { type: Array },
    columns: { type: Array },
    itemsPerPage: { type: Number },
    currentPage: { type: Number },
    pagination: { type: Boolean },
    numberItems: { type: Array }
  };

  constructor() {
    super();
    this.books = [];
    this.currentPage = 1;
    this.pagination = false;
    this.itemsPerPage = 5;
    this.numberItems = [5, 10, 20];
    this.columns = [];
  }
  firstUpdated() {
    this.itemsPerPage = this.numberItems[0]
  }
  get totalPages() {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get paginatedBooks() {
    if (!this.pagination) {
      return this.books;
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.books.slice(start, start + this.itemsPerPage);
  }

  handlePageChange(event) {
    this.currentPage = event.detail.page;
    this.requestUpdate();
  }

  handleItemsPerPageChange(event) {
    this.itemsPerPage = event.detail.itemsPerPage;
    this.currentPage = 1;
    this.requestUpdate();
  }

  renderCellContent(column, book) {
    switch (column.type) {
      case 'text':
        return html`<span>${book[column.property]}</span>`;

      case 'number':
        return html`<span>${book[column.property]}</span>`;

      case 'date':
        return html`<span>${new Date(book[column.property]).toLocaleDateString()}</span>`;

      case 'button':
        return html`
          <button 
            class="btn btn-primary table-button" 
            @click="${() => column.action(book)}">
            ${column.label}
          </button>
        `;

      case 'slot':
        return html`<slot name="${column.property}"></slot>`;

      default:
        return html`<span>${book[column.property]}</span>`;
    }
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      
      ${this.books.length > 0
        ? html`
          <div>
            ${this.pagination ? html`
              <items-per-page 
                .numberItems="${this.numberItems}" 
                @items-per-page-change="${this.handleItemsPerPageChange}">
              </items-per-page>
            ` : ''}

            <table class="table table-striped table-bordered mt-3">
              <thead>
                <tr>
                  ${this.columns.map(column => html`<th>${column.header}</th>`)}
                </tr>
              </thead>
              <tbody>
                ${this.paginatedBooks.map(book => html`
                  <tr>
                    ${this.columns.map(column => html`<td>${this.renderCellContent(column, book)}</td>`)}
                  </tr>
                `)}
              </tbody>
            </table>

            ${this.pagination ? html`
              <pagination-controls 
                .totalPages="${this.totalPages}" 
                .currentPage="${this.currentPage}" 
                @page-change="${this.handlePageChange}">
              </pagination-controls>
            ` : ''}
          </div>
        `
        : html`<p>No books available.</p>`
      }
    `;
  }
}

customElements.define('book-table', BookTable);
