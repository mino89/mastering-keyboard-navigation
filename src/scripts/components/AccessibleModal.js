/**
 * Accessible Modal Component
 * Provides keyboard navigation, focus management, and ARIA support
 */
class AccessibleModal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.modalId = modalId;
    this.focusableElements = [];
    this.previouslyFocusedElement = null;
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;

    if (!this.modal) {
      console.warn(`Modal with ID "${modalId}" not found`);
      return;
    }

    this.init();
  }

  init() {
    // Find trigger buttons
    this.triggers = document.querySelectorAll(
      `[data-modal-trigger="${this.modalId}"]`,
    );
    this.closeButtons = this.modal.querySelectorAll(
      `[data-modal-close="${this.modalId}"]`,
    );
    this.backdrop = this.modal.querySelector(
      `[data-modal-backdrop="${this.modalId}"]`,
    );

    // Bind events
    this.bindEvents();

    // Set initial ARIA state
    this.modal.setAttribute("aria-hidden", "true");
  }

  bindEvents() {
    // Trigger buttons
    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close buttons
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.close();
      });
    });

    // Backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => {
        this.close();
      });
    }

    // Keyboard events
    this.modal.addEventListener("keydown", (e) => {
      this.handleKeydown(e);
    });

    // Prevent background scroll when modal is open
    this.modal.addEventListener("scroll", (e) => {
      e.stopPropagation();
    });
  }

  open() {
    // Store the currently focused element
    this.previouslyFocusedElement = document.activeElement;

    // Show modal
    this.modal.classList.add("modal-open");
    this.modal.setAttribute("aria-hidden", "false");

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Update focusable elements
    this.updateFocusableElements();

    // Focus the modal or first focusable element
    this.setInitialFocus();

    // Announce to screen readers
    this.announceOpen();
  }

  close() {
    // Hide modal
    this.modal.classList.remove("modal-open");
    this.modal.setAttribute("aria-hidden", "true");

    // Restore body scroll
    document.body.style.overflow = "";

    // Return focus to trigger element
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }

    // Announce to screen readers
    this.announceClose();
  }

  updateFocusableElements() {
    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    this.focusableElements = Array.from(
      this.modal.querySelectorAll(focusableSelectors.join(",")),
    ).filter((element) => {
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hasAttribute("aria-hidden")
      );
    });

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement =
      this.focusableElements[this.focusableElements.length - 1];
  }

  setInitialFocus() {
    // Focus the modal container first for screen readers
    this.modal.focus();

    // Then focus the first focusable element if it exists
    if (this.firstFocusableElement) {
      setTimeout(() => {
        this.firstFocusableElement.focus();
      }, 100);
    }
  }

  handleKeydown(e) {
    // ESC key - close modal
    if (e.key === "Escape") {
      e.preventDefault();
      this.close();
      return;
    }

    // TAB key - manage focus trap
    if (e.key === "Tab") {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    if (this.focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab - move backwards
      if (
        document.activeElement === this.firstFocusableElement ||
        document.activeElement === this.modal
      ) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      // Tab - move forwards
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  announceOpen() {
    // Create a live region announcement for screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = "Modal dialog opened";

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  announceClose() {
    // Create a live region announcement for screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = "Modal dialog closed";

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Auto-initialize modals when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Find all modals and initialize them
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    new AccessibleModal(modal.id);
  });
});

export default AccessibleModal;
