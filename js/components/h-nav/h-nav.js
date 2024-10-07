import { LitElement, html, css } from 'lit';

export class HNav extends LitElement {
  static properties = {
    brand: { type: String },
    brandHref: { type: String },
  };

  static styles = css`
    nav {
      margin-bottom: 20px;
    }
  `;

  constructor() {
    super();
    this.brand = 'Brand';
    this.brandHref = '#';
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
      <nav class="navbar navbar-expand-sm bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href=${this.brandHref}>${this.brand}</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
              <slot></slot>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('h-nav', HNav);
