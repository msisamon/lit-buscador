import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class TitleH1 extends LitElement {
    static styles = css`
    
  `;

    static properties = {
        text: { type: String }
    };

    constructor() {
        super();
        this.text = 'Título';
    }

    render() {
        return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <h1 class="fs-3 my-5">${this.text}</h1>
    `;
    }
}

customElements.define('title-h1', TitleH1);
