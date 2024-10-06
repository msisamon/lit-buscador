import { expect, fixture, html } from '@open-wc/testing';
import '../book-search/book-search.js';

describe('BookSearch Component', () => {

    class MockSearchForm extends HTMLElement {
        connectedCallback() {
            this.dispatchEvent(new CustomEvent('search-books', {
                detail: [
                    { isbn: '789', fecha: '2023-02-01', genero: 'Ciencia Ficción', autor: 'Autor3' }
                ]
            }));
        }
    }
    customElements.define('search-form', MockSearchForm);

    it('renders search form', async () => {
        const el = await fixture(html`<book-search></book-search>`);
        const searchForm = el.shadowRoot.querySelector('search-form');
        expect(searchForm).to.exist;
    });

    it('renders book-table when handle-search is triggered', async () => {

        const el = await fixture(html`<book-search></book-search>`);

        await el.updateComplete;
        const bookTable = el.shadowRoot.querySelector('book-table');
        const rows = bookTable.shadowRoot.querySelectorAll('tbody tr');

        expect(rows.length).to.be.greaterThan(0);
    });


    it('passes pagination and items-per-page attributes correctly to book-table', async () => {
        const el = await fixture(html`<book-search pagination items-per-page="[1, 2, 5]"></book-search>`);
        await el.updateComplete;


        const bookTable = el.shadowRoot.querySelector('book-table');

        expect(bookTable.pagination).to.be.true;

        console.log(bookTable.itemsPerPage)
        expect(bookTable.itemsPerPage).to.deep.equal(1); //first number of the array by default
    });

});
