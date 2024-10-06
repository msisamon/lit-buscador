import { html } from 'lit';

export const decorators = [
    (Story) => {
        return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div style="padding: 20px;">
        ${Story()}
      </div>
    `;
    },
];
