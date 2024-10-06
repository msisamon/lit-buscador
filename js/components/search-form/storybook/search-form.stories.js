import { html } from 'lit';
import '../search-form.js';
export default {
  title: 'Components/SearchForm',
  component: 'search-form',
};

const Template = (args) => {
  const handleSearchBooks = (e) => {
    console.log('Search form submitted:', e.detail);
    args.onSearchBooks(e);
  };

  return html`
    <search-form
      @search-books="${handleSearchBooks}"
    ></search-form>
  `;
};

export const Default = Template.bind({});
Default.args = {
  onSearchBooks: (e) => {
    console.log('Search triggered with data:', e.detail);
  },
};
