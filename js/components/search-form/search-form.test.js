import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../search-form/search-form.js';

describe('SearchForm Component', () => {
    it('renders correctly', async () => {
        const el = await fixture(html`<search-form></search-form>`);
        expect(el.shadowRoot.querySelectorAll('input').length).to.equal(4);
        expect(el.shadowRoot.querySelector('select')).to.exist;
    });

    it('shows error message when no fields are filled and form is submitted', async () => {
        const el = await fixture('<search-form></search-form>');
        const form = el.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await el.updateComplete;
        const errorMessage = el.shadowRoot.querySelector('.alert-danger');
        expect(errorMessage).to.exist;
        expect(errorMessage.textContent).to.equal('Por favor, rellena al menos un campo');
    });

    it('triggers search-books event with correct data', async () => {
        const el = await fixture('<search-form></search-form>');

        el.shadowRoot.getElementById('isbn').value = '12345';
        el.shadowRoot.getElementById('fecha').value = '2023-01-01';
        el.shadowRoot.getElementById('genero').value = 'Narrativa';

        const form = el.shadowRoot.querySelector('form');

        const eventSpy = sinon.spy();
        el.addEventListener('search-books', eventSpy);

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(eventSpy.calledOnce).to.be.true;

        const eventDetail = eventSpy.firstCall.args[0].detail;
        console.log(eventDetail)
        expect(eventDetail).to.deep.equal({
            isbn: '12345',
            fecha: '2023-01-01',
            genero: 'Narrativa',
            autor: '',
            editorial: ''
        });
    });
});
