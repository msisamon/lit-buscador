import { html } from 'lit';
import '../items-per-page.js';

export default {
    title: 'Components/ItemsPerPage',
    component: 'items-per-page',
};

const Template = (args) => html`
  <items-per-page .numberItems="${args.numberItems}" @items-per-page-change="${args.onItemsPerPageChange}"></items-per-page>
`;

export const Default = Template.bind({});
Default.args = {
    numberItems: [5, 10, 15, 20],
    onItemsPerPageChange: (e) => {
        console.log('Items per page changed:', e.detail.value);
    }
};

export const CustomItems = Template.bind({});
CustomItems.args = {
    numberItems: [10, 20, 30],
    onItemsPerPageChange: (e) => {
        console.log('Items per page changed:', e.detail.value);
    }
};
