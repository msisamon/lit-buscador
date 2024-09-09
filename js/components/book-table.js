import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class Table extends LitElement {
  static styles = css`
    .pagination {
      margin: 20px 0;
    }
  `;

  static properties = {
    books: { type: Array },
    itemsPerPage: { type: Number },
    currentPage: { type: Number },
  };

  constructor() {
    super();
    this.books = [];
    this.itemsPerPage = 5; // Default items per page
    this.currentPage = 1; // Default to the first page
  }

  get totalPages() {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get paginatedBooks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.books.slice(start, end);
  }

  handlePageChange(event) {
    this.currentPage = Number(event.target.dataset.page);
    this.requestUpdate();
  }

  handleItemsPerPageChange(event) {
    this.itemsPerPage = Number(event.target.value);
    this.currentPage = 1; // Reset to first page when items per page changes
    this.requestUpdate();
  }

  renderPaginationControls() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    return html`
      <nav aria-label="Page navigation">
        <ul class="pagination">
          ${pages.map(page => html`
            <li class="page-item ${page === this.currentPage ? 'active' : ''}">
              <a class="page-link" href="#" data-page="${page}" @click="${this.handlePageChange}">${page}</a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      
      ${this.books.length > 0
        ? html`
          <div class="mb-3 mt-5">
            <label for="items-per-page" class="form-label">Items per page:</label>
            <select id="items-per-page" class="form-select" @change="${this.handleItemsPerPageChange}">
              <option value="5" ?selected="${this.itemsPerPage === 5}">5</option>
              <option value="10" ?selected="${this.itemsPerPage === 10}">10</option>
              <option value="25" ?selected="${this.itemsPerPage === 25}">25</option>
              <option value="50" ?selected="${this.itemsPerPage === 50}">50</option>
            </select>
          </div>

          <div class="table-responsive mt-5">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>ISBN</th>
                  <th>Fecha Publicación</th>
                  <th>Género</th>
                  <th>Nombre del Autor/Autora</th>
                  <th>Editorial</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                ${this.paginatedBooks.map(book => html`
                  <tr>
                    <td>${book.isbn}</td>
                    <td>${book.fechaPublicacion}</td>
                    <td>${book.genero}</td>
                    <td>${book.autor}</td>
                    <td>${book.editorial}</td>
                    <td>
                      <button class="btn btn-primary">Ver más</button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          ${this.renderPaginationControls()}
        `
        : html`<p>No books available.</p>`}
    `;
  }
}

customElements.define('book-table', Table);
