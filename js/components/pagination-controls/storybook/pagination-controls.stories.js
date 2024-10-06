import { html } from 'lit';
import '../pagination-controls.js';

export default {
    title: 'Components/PaginationControls',
    component: 'pagination-controls',
};

const Template = (args) => {
    let currentPage = args.currentPage;

    const handlePageChange = (e) => {
        currentPage = e.detail.page;
        document.querySelector('pagination-controls').currentPage = currentPage;
        args.onPageChange(e);
    };

    return html`
    <pagination-controls
      .totalPages="${args.totalPages}"
      .currentPage="${currentPage}"
      @page-change="${handlePageChange}"
    ></pagination-controls>
  `;
};

export const Pagination = Template.bind({});
Pagination.args = {
    totalPages: 5,
    currentPage: 1,
    onPageChange: (e) => {
        console.log('Page changed to:', e.detail.page);
    }
};
