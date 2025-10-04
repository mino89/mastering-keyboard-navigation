/**
 * Simple Mega Menu with Hover Functionality
 * Opens mega menu on hover, no complex keyboard navigation
 */

import {
  initTabIndex,
  checkNextTabIndex,
  resetTabIndex,
} from "../examples/tab-navigation";

export class AccessibleMegaMenu {
  constructor(button, menu) {
    this.button = button;
    this.menu = menu;
    this.hoverTimeout = null;

    this.init();
  }

  init() {
    // Simple hover functionality
    this.button.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this),
    );
    this.button.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this),
    );
    this.menu.addEventListener(
      "mouseenter",
      this.handleMenuMouseEnter.bind(this),
    );
    this.menu.addEventListener(
      "mouseleave",
      this.handleMenuMouseLeave.bind(this),
    );

    this.menu.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        checkNextTabIndex(this.menu, () => this.closeMenu());
      }
    });

    // Simple click to toggle
    this.button.addEventListener("click", this.toggleMenu.bind(this));

    // Close on outside click
    document.addEventListener("click", this.handleOutsideClick.bind(this));

    // Close on escape key
    document.addEventListener("keydown", this.handleDocumentKeydown.bind(this));
  }

  openMenu() {
    this.button.setAttribute("aria-expanded", "true");
    this.menu.classList.add("show");
    // set tabindex to 0 to allow tabbing into menu
    initTabIndex(this.menu);
  }

  closeMenu() {
    // reset tabindex to -1 to prevent tabbing into hidden menu
    resetTabIndex(this.menu);
    this.button.setAttribute("aria-expanded", "false");
    this.menu.classList.remove("show");
  }

  toggleMenu() {
    const isExpanded = this.button.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  handleMouseEnter() {
    // Clear any existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    // Open menu immediately on hover
    this.openMenu();
  }

  handleMouseLeave() {
    // Set timeout to close menu when leaving button
    this.hoverTimeout = setTimeout(() => {
      this.closeMenu();
    }, 100);
  }

  handleMenuMouseEnter() {
    // Clear timeout when entering menu
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  handleMenuMouseLeave() {
    // Close menu when leaving menu
    this.closeMenu();
  }

  handleOutsideClick(e) {
    if (!this.button.contains(e.target) && !this.menu.contains(e.target)) {
      this.closeMenu();
    }
  }

  handleDocumentKeydown(e) {
    if (e.key === "Escape" && this.menu.classList.contains("show")) {
      this.closeMenu();
    }
  }
}
