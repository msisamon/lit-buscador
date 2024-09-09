import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class BookSearch extends LitElement {
    static properties = {
        books: { type: Array }
    };

    constructor() {
        console.log("Hola")
        super();
        this.books = [];
    }

    async handleSearch(event) {
        console.log("Searching...")

        const searchParams = event.detail;

        // Make the API request based on the search data
        const apiUrl = 'https://api.example.com/books'; // Replace with your real API URL
        const params = new URLSearchParams(searchParams);
        /*try {
            const response = await fetch(`${apiUrl}?${params}`);
            const data = await response.json();

            this.books = data.map(book => ({
                isbn: book.isbn,
                fechaPublicacion: new Date(book.fechaPublicacion).toLocaleDateString('es-ES'),
                genero: book.genero,
                autor: book.autor,
                editorial: book.editorial
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
        }*/
        this.books = [
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A' },
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A' },
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A' },
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A' },
            { isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A', editorial: 'Editorial A' },
            { isbn: '9876543210987', fecha: '2022-12-31', genero: 'Poesía', autor: 'Author B', editorial: 'Editorial B' }
        ];
        this.requestUpdate();
    }

    render() {
        return html`
        <p>Search</p>
        <search-form @search-books="${this.handleSearch}"></search-form>
        ${this.books.length > 0 ? html`<book-table .books="${this.books}"></book-table>` : ''}
      `;
    }
}

customElements.define('book-search', BookSearch);
