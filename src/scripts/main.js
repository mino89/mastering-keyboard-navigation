// Import all components and utilities
import { AccessibleMegaMenu } from "./components/AccessibleMegaMenu.js";
import { AccessibleDropdown } from "./components/AccessibleDropdown.js";
import { AccessibleSearch } from "./components/AccessibleSearch.js";
import { AccessibleProductCard } from "./components/AccessibleProductCard.js";
import AccessibleModal from "./components/AccessibleModal.js";
import { FocusManager } from "./utils/FocusManager.js";
import { KeyboardShortcuts } from "./utils/KeyboardShortcuts.js";
import { initSkipContent } from "./examples/skip-to-main-content.js";

/**
 * Application Initializer
 * Coordinates the initialization of all accessibility features
 */
class App {
  static init() {
    console.log("Initializing accessibility features...");

    this.initMegaMenus();
    this.initDropdowns();
    this.initSearch();
    this.initProductCards();
    this.initMobileMenu();
    this.initSkipLinks();
    this.initKeyboardShortcuts();
    this.announcePageLoad();
    this.initSkipContent();
    console.log("Accessibility features initialized successfully");
  }

  static initMegaMenus() {
    const megaMenuButtons = document.querySelectorAll("[data-megamenu]");
    megaMenuButtons.forEach((button) => {
      const menuId = button.getAttribute("aria-controls");
      const menu = document.getElementById(menuId);
      if (menu) {
        new AccessibleMegaMenu(button, menu);
      }
    });
  }

  static initDropdowns() {
    const dropdownButtons = document.querySelectorAll("[data-dropdown]");
    dropdownButtons.forEach((button) => {
      const menuId = button.getAttribute("aria-controls");
      const menu = document.getElementById(menuId);
      if (menu) {
        new AccessibleDropdown(button, menu);
      }
    });
  }

  static initSearch() {
    const searchForms = document.querySelectorAll('form[role="search"]');
    searchForms.forEach((form) => {
      new AccessibleSearch(form);
    });
  }

  static initProductCards() {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      new AccessibleProductCard(card);
    });
  }

  static initMobileMenu() {
    const mobileMenuButton = document.querySelector(".md\\:hidden button");
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", () => {
        console.log("Mobile menu clicked - implement mobile navigation");
      });
    }
  }

  static initSkipLinks() {
    const skipLink = document.querySelector(".skip-link");
    if (skipLink) {
      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute("href"));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  static initKeyboardShortcuts() {
    KeyboardShortcuts.init();
  }

  static announcePageLoad() {
    FocusManager.announcePageChange("AccessiShop homepage loaded");
  }

  static initSkipContent() {
    initSkipContent(document.querySelector(".skip-link"));
  }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

// Export classes for potential external use
export {
  AccessibleMegaMenu,
  AccessibleDropdown,
  AccessibleSearch,
  AccessibleProductCard,
  FocusManager,
  KeyboardShortcuts,
  App,
};
