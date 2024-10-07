import { LitElement, html } from 'lit';

export class ModalComponent extends LitElement {
  static properties = {
    fields: { type: Array },
  };

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="modal fade show" tabindex="-1" style="display: block;" @click="${this.handleBackdropClick}">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Book Details</h5>
              <button type="button" class="btn-close" @click="${this.closeModal}" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${this.fields.map(field => html`
                <p><strong>${field.label}:</strong> ${field.content}</p>
              `)}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="${this.closeModal}">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="${this.handleBackdropClick}"></div>
    `;
  }

  handleBackdropClick(event) {
    // Close modal only if the click is outside the modal content
    if (event.target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  closeModal() {
    const event = new CustomEvent('close-modal', {
      detail: { close: true },
    });
    this.dispatchEvent(event);
  }
}

customElements.define('modal-component', ModalComponent);
