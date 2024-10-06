import { LitElement, html } from 'lit';
import '../book-table/book-table.js';
import '../items-per-page/items-per-page.js';
import '../pagination-controls/pagination-controls.js';

export class BookSearch extends LitElement {
    static properties = {
        books: { type: Array },
        pagination: { type: Boolean, attribute: true },
        numberItems: { type: Array, attribute: 'items-per-page' }
    };

    constructor() {
        super();
        this.books = [];
        this.pagination = false;
        this.numberItems = [5, 10, 20];
    }

    async handleSearch(event) {
        this.books = this.createMockBooks();
        this.requestUpdate();
    }


    createMockBooks() {
        return [
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A', paginas: 350, tiempoLectura: '6 horas', descripcion: 'Un fascinante relato sobre la vida moderna.', precio: '$19.99', anoEdicion: 2021, encuadernacion: 'Tapa dura', idioma: 'Español' },
            { isbn: '9876543210987', fecha: '2022-12-31', genero: 'Poesía', autor: 'Author B', editorial: 'Editorial B', paginas: 120, tiempoLectura: '2 horas', descripcion: 'Una colección de poemas profundos.', precio: '$12.50', anoEdicion: 2020, encuadernacion: 'Tapa blanda', idioma: 'Español' },
            { isbn: '2345678901234', fecha: '2021-05-12', genero: 'Ensayo', autor: 'Author C', editorial: 'Editorial C', paginas: 200, tiempoLectura: '4 horas', descripcion: 'Un análisis detallado de temas contemporáneos.', precio: '$15.99', anoEdicion: 2021, encuadernacion: 'Tapa dura', idioma: 'Español' },
            { isbn: '3456789012345', fecha: '2020-08-15', genero: 'Ficción', autor: 'Author D', editorial: 'Editorial D', paginas: 280, tiempoLectura: '5 horas', descripcion: 'Una historia ficticia cautivadora.', precio: '$17.99', anoEdicion: 2019, encuadernacion: 'Tapa blanda', idioma: 'Español' },
            { isbn: '4567890123456', fecha: '2019-10-20', genero: 'Ciencia', autor: 'Author E', editorial: 'Editorial E', paginas: 320, tiempoLectura: '6 horas', descripcion: 'Una explicación detallada de descubrimientos científicos.', precio: '$22.99', anoEdicion: 2018, encuadernacion: 'Tapa dura', idioma: 'Español' },
            { isbn: '5678901234567', fecha: '2018-07-10', genero: 'Biografía', autor: 'Author F', editorial: 'Editorial F', paginas: 450, tiempoLectura: '8 horas', descripcion: 'La vida de una persona extraordinaria.', precio: '$24.99', anoEdicion: 2017, encuadernacion: 'Tapa blanda', idioma: 'Español' }
        ];
    }

    render() {
        return html`
      <p>Search</p>
      <search-form @search-books="${this.handleSearch}"></search-form>
      
      ${this.books.length > 0 ? html`
        <book-table .books="${this.books}" .pagination="${this.pagination}" .numberItems="${this.numberItems}" .columns = ${{ isbn: 'ISBN', fecha: 'Fecha', genero: 'Género', autor: 'Autor' }}></book-table>
      ` : ''}
    `;
    }
}

customElements.define('book-search', BookSearch);
