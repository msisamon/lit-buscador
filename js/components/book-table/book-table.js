import { LitElement, html, css } from 'lit';

export class Table extends LitElement {
  static styles = css`
    .pagination {
      margin: 20px 0;
    }
  `;

  static properties = {
    books: { type: Array },
    columns: { type: Object },
    itemsPerPage: { type: Number },
    currentPage: { type: Number },
    selectedBook: { type: Object },
    pagination: { type: Boolean }
  };

  constructor() {
    super();
    this.books = [];
    this.currentPage = 1;
    this.selectedBook = null;
    this.pagination = false;
    this.itemsPerPage = 5;
    this.numberItems = [];
    this.columns = { isbn: 'ISBN', fecha: 'Fecha', genero: 'Género', autor: 'Autor' };
  }

  firstUpdated() {
    this.itemsPerPage = this.numberItems[0]
  }

  updated(changedProperties) {
    if (changedProperties.has('pagination')) {
      this.pagination = this.pagination === 'true' || this.pagination === true;
    }
  }

  get totalPages() {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get paginatedBooks() {
    if (!this.pagination) {
      return this.books;
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.books.slice(start, end);
  }

  handlePageChange(event) {
    this.currentPage = event.detail.page;
    this.requestUpdate();
  }

  handleItemsPerPageChange(event) {
    this.itemsPerPage = event.detail.value;
    this.currentPage = 1;
    this.requestUpdate();
  }

  handleViewMore(book) {
    this.selectedBook = book;
    this.renderModal();
  }

  renderModal() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
      <div class="modal fade" id="bookModal" tabindex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="bookModalLabel">Book Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>ISBN:</strong> ${this.selectedBook.isbn}</p>
              <p><strong>Pages:</strong> ${this.selectedBook.paginas}</p>
              <p><strong>Reading Time:</strong> ${this.selectedBook.tiempoLectura}</p>
              <p><strong>Description:</strong> ${this.selectedBook.descripcion}</p>
              <p><strong>Price:</strong> ${this.selectedBook.precio}</p>
              <p><strong>Publication Year:</strong> ${this.selectedBook.anoEdicion}</p>
              <p><strong>Binding:</strong> ${this.selectedBook.encuadernacion}</p>
              <p><strong>Language:</strong> ${this.selectedBook.idioma}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalContainer);

    //const modal = new bootstrap.Modal(modalContainer.querySelector('#bookModal'));
    //modal.show();

    modalContainer.querySelector('#bookModal').addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modalContainer);
    });
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
                  ${Object.values(this.columns).map(columnName => html`<th>${columnName}</th>`)}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                ${this.paginatedBooks.map(book => html`
                  <tr>
                    ${Object.keys(this.columns).map(field => html`<td>${book[field]}</td>`)}
                    <td>
                      <button 
                        class="btn btn-primary" 
                        @click="${() => this.handleViewMore(book)}">
                        Ver más
                      </button>
                    </td>
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

customElements.define('book-table', Table);
