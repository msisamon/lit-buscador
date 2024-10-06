import { expect, fixture, html } from '@open-wc/testing';
import '../pagination-controls/pagination-controls.js';

describe('PaginationControls Component', () => {
    it('renders correct number of page links', async () => {
        const el = await fixture(html`<pagination-controls totalPages="5" currentPage="1"></pagination-controls>`);
        const pageLinks = el.shadowRoot.querySelectorAll('.page-item');
        expect(pageLinks.length).to.equal(5);
        expect(pageLinks[0].textContent.trim()).to.equal("1");
        expect(pageLinks[4].textContent.trim()).to.equal("5");
    });


    it('emits page-change event with the correct page when a new page is clicked', async () => {
        const el = await fixture(html`<pagination-controls totalPages="5" currentPage="1"></pagination-controls>`);
        const pageLink = el.shadowRoot.querySelectorAll('.page-link')[2];

        let selectedPage = null;
        el.addEventListener('page-change', (event) => {
            selectedPage = event.detail.page;
        });

        pageLink.click();

        expect(selectedPage).to.equal(3);
    });
});
