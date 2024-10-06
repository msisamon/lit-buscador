import { expect, fixture, html } from '@open-wc/testing';
import '../book-table/book-table.js';

describe('BookTable Component', () => {
    it('renders empty table when no books provided', async () => {
        const el = await fixture(html`<book-table></book-table>`);
        const rows = el.shadowRoot.querySelectorAll('table tbody tr');

        expect(rows.length).to.equal(0);
    });

    it('renders book data when provided', async () => {
        const books = [
            { isbn: '123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Autor1' },
            { isbn: '456', fecha: '2023-01-02', genero: 'Poesía', autor: 'Autor2' },
        ];
        const el = await fixture(html`<book-table .books=${books}></book-table>`);
        const rows = el.shadowRoot.querySelectorAll('table tbody tr');

        expect(rows.length).to.equal(2);
        expect(rows[0].textContent).to.include('123');
        expect(rows[1].textContent).to.include('456');
    });

    it('does not render pagination controls when pagination is disabled', async () => {
        const el = await fixture(html`<book-table></book-table>`);
        await el.updateComplete;
        const paginationControls = el.shadowRoot.querySelector('pagination-controls');
        expect(paginationControls).to.be.null;
    });

    it('renders pagination controls when pagination is enabled', async () => {
        const el = await fixture(html`
          <book-table
            .books="${[{ isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A' }]}"
            pagination="true"
          ></book-table>
        `);
        await el.updateComplete;

        const paginationControls = el.shadowRoot.querySelector('pagination-controls');
        expect(paginationControls).to.exist;
    });

    //new
    it('renders pagination controls when pagination is enabled', async () => {
        const el = await fixture(html`
          <book-table
            .books="${[{ isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A' }]}"
            pagination="true"
          ></book-table>
        `);
        await el.updateComplete;

        const paginationControls = el.shadowRoot.querySelector('pagination-controls');
        expect(paginationControls).to.exist;
    });

    it('updates currentPage when page-change event is triggered', async () => {
        const el = await fixture(html`
          <book-table
            .books="${[{ isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A' }]}"
            pagination="true"
          ></book-table>
        `);

        el.shadowRoot.querySelector('pagination-controls').dispatchEvent(new CustomEvent('page-change', {
            detail: { page: 2 },
            bubbles: true,
            composed: true
        }));

        await el.updateComplete;
        expect(el.currentPage).to.equal(2);
    });

    it('updates itemsPerPage and resets currentPage when items-per-page-change event is triggered', async () => {
        const el = await fixture(html`
          <book-table
            .books="${[{ isbn: '1234567890123', fecha: '2023-01-01', genero: 'Narrativa', autor: 'Author A' }]}"
            pagination="true"
          ></book-table>
        `);

        el.shadowRoot.querySelector('items-per-page').dispatchEvent(new CustomEvent('items-per-page-change', {
            detail: { value: 10 },
            bubbles: true,
            composed: true
        }));

        await el.updateComplete;
        expect(el.itemsPerPage).to.equal(10);
        expect(el.currentPage).to.equal(1);
    });

    it('renders and displays modal of a book when button is clicked', async () => {

        const el = await fixture(html`
          <book-table
            .books="${[{ isbn: '1234567890123', paginas: '200', tiempoLectura: '5h', descripcion: 'A great book', precio: '$20', anoEdicion: '2023', encuadernacion: 'Hardcover', idioma: 'English' },
            { isbn: '0004567890123', paginas: '200', tiempoLectura: '5h', descripcion: 'A great book', precio: '$20', anoEdicion: '2023', encuadernacion: 'Hardcover', idioma: 'English' }]}"
          ></book-table>
        `);

        el.shadowRoot.querySelector('button').click();
        await el.updateComplete;

        const modalContainer = document.body.querySelector('div.modal');

        const modalContent = modalContainer.innerHTML;
        expect(modalContent).to.include('1234567890123');

    });
});
