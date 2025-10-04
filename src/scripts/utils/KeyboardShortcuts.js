/**
 * Keyboard Shortcuts Handler
 */
export class KeyboardShortcuts {
  static init() {
    document.addEventListener("keydown", this.handleGlobalKeydown.bind(this));
  }

  static handleGlobalKeydown(e) {
    // Global keyboard shortcuts
    if (e.altKey) {
      switch (e.key) {
        case "s":
          e.preventDefault();
          this.focusSearch();
          break;
        case "m":
          e.preventDefault();
          this.focusMainNavigation();
          break;
        case "c":
          e.preventDefault();
          this.focusCart();
          break;
      }
    }
  }

  static focusSearch() {
    const searchElement = document.querySelector("#search");
    if (searchElement) {
      searchElement.focus();
    }
  }

  static focusMainNavigation() {
    const navElement = document.querySelector('nav [role="menuitem"]');
    if (navElement) {
      navElement.focus();
    }
  }

  static focusCart() {
    const cartElement = document.querySelector('[aria-label*="cart"]');
    if (cartElement) {
      cartElement.focus();
    }
  }
}
