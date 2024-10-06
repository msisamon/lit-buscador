import { expect, fixture, html } from '@open-wc/testing';
import '../items-per-page/items-per-page.js';

describe('ItemsPerPage Component', () => {

    it('renders custom options when provided', async () => {
        const el = await fixture(html`<items-per-page numberItems="[5, 10, 25]"></items-per-page>`);
        const options = el.shadowRoot.querySelectorAll('option');

        expect(options.length).to.equal(3);
        expect(options[0].value).to.equal('5');
        expect(options[1].value).to.equal('10');
        expect(options[2].value).to.equal('25');
    });


    it('emits items-per-page-change event when an option is selected', async () => {
        const el = await fixture(html`<items-per-page numberItems="[5, 10, 25]"></items-per-page>`);
        const select = el.shadowRoot.querySelector('select');
        let selectedValue;
        el.addEventListener('items-per-page-change', (e) => {
            selectedValue = e.detail.value;
        });

        select.value = '10';
        select.dispatchEvent(new Event('change'));

        expect(selectedValue).to.equal(10);
    });

});
