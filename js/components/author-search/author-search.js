import { LitElement, html } from 'lit';
import '../book-table/book-table.js';
import '../modal/modal-component.js';

export class AuthorSearch extends LitElement {
    static properties = {
        authors: { type: Array },
        pagination: { type: Boolean },
        numberItems: { type: Array },
        selectedAuthor: { type: Object }
    };

    constructor() {
        super();
        this.authors = [];
        this.pagination = false;
        this.numberItems = [5, 10, 20];
        this.selectedAuthor = null;
    }

    handleSearch(event) {
        event.preventDefault();
        this.authors = this.createMockAuthors();
        this.requestUpdate();
    }

    viewAuthorDetails(author) {
        this.selectedAuthor = author;
    }

    closeModal() {
        this.selectedAuthor = null;
    }

    createMockAuthors() {
        return [
            {
                nombre: 'Author A',
                genero: 'Ficción',
                anoNacimiento: 1980,
                lugarNacimiento: 'Madrid',
                libros: [
                    { año: 2001, nombre: 'Book A1' },
                    { año: 2005, nombre: 'Book A2' },
                ],
            },
            {
                nombre: 'Author B',
                genero: 'Poesía',
                anoNacimiento: 1975,
                lugarNacimiento: 'Barcelona',
                libros: [
                    { año: 2000, nombre: 'Book B1' },
                ],
            },
            {
                nombre: 'Author C',
                genero: 'No Ficción',
                anoNacimiento: 1990,
                lugarNacimiento: 'Valencia',
                libros: [
                    { año: 2010, nombre: 'Book C1' },
                    { año: 2015, nombre: 'Book C2' },
                ],
            },
            {
                nombre: 'Author D',
                genero: 'Biografía',
                anoNacimiento: 1965,
                lugarNacimiento: 'Sevilla',
                libros: [
                    { año: 2018, nombre: 'Book D1' },
                ],
            },
        ];
    }

    render() {
        const columns = [
            { header: 'Nombre', property: 'nombre', type: 'text' },
            { header: 'Género', property: 'genero', type: 'text' },
            { header: 'Año de nacimiento', property: 'anoNacimiento', type: 'number' },
            { header: 'Lugar de nacimiento', property: 'lugarNacimiento', type: 'text' },
            {
                header: 'Libros',
                property: 'libros',
                type: 'button',
                label: 'Ver más',
                action: (author) => this.viewAuthorDetails(author)
            }
        ];

        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <div class="gap-5 d-flex flex-wrap align-items-end p-3 bg-secondary-subtle rounded justify-content-between">
                <form class="d-flex w-100" @submit="${this.handleSearch}">
                    <input type="text" class="form-control me-2" placeholder="Buscar autores" required>
                    <button type="submit" class="btn btn-primary">Buscar</button>
                </form>
            </div>

            ${this.authors.length > 0
                ? html`
                    <book-table
                      .books="${this.authors}"
                      .columns="${columns}"
                      .pagination="${this.pagination}"
                      .numberItems="${this.numberItems}">
                    </book-table>
                  `
                : ''}

            ${this.selectedAuthor
                ? html`
                    <modal-component
                      .fields="${this.selectedAuthor.libros.map(libro => ({
                    label: 'Año: ' + libro.año,
                    content: libro.nombre
                }))}"
                      @close-modal="${this.closeModal}">
                    </modal-component>
                  `
                : ''}
        `;
    }
}

customElements.define('author-search', AuthorSearch);
