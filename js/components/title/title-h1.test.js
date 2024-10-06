import { expect, fixture } from '@open-wc/testing';
import '../title/title-h1.js';

describe('TitleH1 Component', () => {
    it('renders default text', async () => {
        const el = await fixture('<title-h1></title-h1>');
        const h1 = el.shadowRoot.querySelector('h1');
        expect(h1.textContent).to.equal('Título');
    });

    it('accepts text property', async () => {
        const el = await fixture('<title-h1 text="Nuevo título"></title-h1>');
        const h1 = el.shadowRoot.querySelector('h1');
        expect(h1.textContent).to.equal('Nuevo título');
    });
});
