import { LitElement, html, css } from 'lit';

export class SearchForm extends LitElement {
  static styles = css``;

  constructor() {
    super();
    this.genres = ['Narrativa', 'Poesía', 'Dramático'];
    this.maxIsbnLength = 13;
    this.isbnPattern = "[A-Za-z0-9]{1,13}";
    this.maxDate = new Date().toISOString().split('T')[0];
    this.errorMessage = '';
  }

  handleSearch(event) {
    console.log("Entering data...");
    event.preventDefault();

    const isbn = this.shadowRoot.getElementById('isbn').value.trim();
    const fecha = this.shadowRoot.getElementById('fecha').value;
    const genero = this.shadowRoot.getElementById('genero').value;
    const autor = this.shadowRoot.getElementById('autor').value.trim();
    const editorial = this.shadowRoot.getElementById('editorial').value.trim();


    if (!isbn && !fecha && !genero && !autor && !editorial) {
      console.log("Error...");

      this.errorMessage = 'Por favor, rellena al menos un campo';
      this.requestUpdate();
      return;
    }
    console.log("Sending search...")
    this.errorMessage = '';

    const searchData = { isbn, fecha, genero, autor, editorial };

    this.dispatchEvent(new CustomEvent('search-books', {
      detail: searchData,
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <form @submit="${this.handleSearch}" class="gap-5 d-flex flex-wrap align-items-end p-3 bg-secondary-subtle rounded justify-content-between">
        <!-- ISBN Field -->
        <div class="form-group">
          <label for="isbn">ISBN</label>
          <input
            type="text"
            class="form-control"
            id="isbn"
            maxlength="${this.maxIsbnLength}"
            pattern="${this.isbnPattern}"
            placeholder="ISBN"
          />
        </div>

        <!-- Fecha de Publicación -->
        <div class="form-group">
          <label for="fecha">Fecha de Publicación</label>
          <input
            type="date"
            class="form-control"
            id="fecha"
            max="${this.maxDate}"
          />
        </div>

        <!-- Género Selector -->
        <div class="form-group">
          <label for="genero">Género</label>
          <select class="form-control" id="genero" name="genero">
            <option value="" disabled selected>Género</option>  
            ${this.genres.map((genre) => html`<option value="${genre}">${genre}</option>`)}
          </select>
        </div>

        <!-- Nombre de Autor/Autora -->
        <div class="form-group">
          <label for="autor">Nombre de Autor/Autora</label>
          <input type="text" class="form-control" id="autor" placeholder="Autor/a"/>
        </div>

        <!-- Editorial -->
        <div class="form-group">
          <label for="editorial">Editorial</label>
          <input type="text" class="form-control" id="editorial" placeholder="Editorial"/>
        </div>

        <!-- Search Button -->
        <button type="submit" class="btn btn-primary rounded-circle p-0 mb-0 d-flex align-items-center justify-content-center ms-auto" style="width: 40px; height: 40px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>

        <!-- Validation -->
        ${this.errorMessage
        ? html`<div class="alert alert-danger mt-3 w-100">${this.errorMessage}</div>`
        : null}
      </form>
    `;
  }
}

customElements.define('search-form', SearchForm);
