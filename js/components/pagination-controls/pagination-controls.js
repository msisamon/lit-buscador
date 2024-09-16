import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class PaginationControls extends LitElement {
    static properties = {
        totalPages: { type: Number },
        currentPage: { type: Number }
    };

    handlePageChange(page) {
        this.dispatchEvent(new CustomEvent('page-change', {
            detail: { page }
        }));
    }

    render() {
        const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <nav aria-label="Page navigation">
        <ul class="pagination">
          ${pages.map(page => html`
            <li class="page-item ${page === this.currentPage ? 'active' : ''}">
              <a class="page-link" href="#" @click="${(e) => { e.preventDefault(); this.handlePageChange(page); }}">${page}</a>
            </li>
          `)}
        </ul>
      </nav>
    `;
    }
}

customElements.define('pagination-controls', PaginationControls);
