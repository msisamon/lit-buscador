import { html } from 'lit';
import '../title-h1.js'; // Ensure the correct path to your component

export default {
  title: 'Components/TitleH1',
  component: 'title-h1',
};

const Template = (args) => html`
  <title-h1 text="${args.text}"></title-h1>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Título',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  text: 'Custom Title',
};
