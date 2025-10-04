/**
 * Dropdown Navigation with Keyboard Support (Legacy support)
 * Implements ARIA menubar pattern with full keyboard navigation
 */
export class AccessibleDropdown {
  constructor(button, menu) {
    this.button = button;
    this.menu = menu;
    this.menuItems = menu.querySelectorAll('[role="menuitem"]');
    this.currentIndex = -1;

    this.init();
  }

  init() {
    // Button event listeners
    this.button.addEventListener("click", this.toggleMenu.bind(this));
    this.button.addEventListener(
      "keydown",
      this.handleButtonKeydown.bind(this),
    );

    // Menu item event listeners
    this.menuItems.forEach((item, index) => {
      item.addEventListener("keydown", (e) =>
        this.handleMenuItemKeydown(e, index),
      );
      item.addEventListener("click", this.closeMenu.bind(this));
    });

    // Close menu when clicking outside
    document.addEventListener("click", this.handleOutsideClick.bind(this));

    // Close menu on escape key
    document.addEventListener("keydown", this.handleDocumentKeydown.bind(this));
  }

  toggleMenu() {
    const isExpanded = this.button.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.button.setAttribute("aria-expanded", "true");
    this.menu.classList.add("show");

    // Focus first menu item
    this.currentIndex = 0;
    this.focusMenuItem(0);
  }

  closeMenu() {
    this.button.setAttribute("aria-expanded", "false");
    this.menu.classList.remove("show");
    this.currentIndex = -1;

    // Reset all menu item tabindex values
    this.menuItems.forEach((item) => item.setAttribute("tabindex", "-1"));

    // Return focus to button
    this.button.focus();
  }

  focusMenuItem(index) {
    // Remove tabindex from all items
    this.menuItems.forEach((item) => item.setAttribute("tabindex", "-1"));

    // Set focus on current item
    if (index >= 0 && index < this.menuItems.length) {
      this.menuItems[index].setAttribute("tabindex", "0");
      this.menuItems[index].focus();
      this.currentIndex = index;
    }
  }

  handleButtonKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault();
        this.openMenu();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.openMenu();
        this.focusMenuItem(this.menuItems.length - 1);
        break;
    }
  }

  handleMenuItemKeydown(e, index) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = (index + 1) % this.menuItems.length;
        this.focusMenuItem(nextIndex);
        break;

      case "ArrowUp":
        e.preventDefault();
        const prevIndex =
          (index - 1 + this.menuItems.length) % this.menuItems.length;
        this.focusMenuItem(prevIndex);
        break;

      case "Home":
        e.preventDefault();
        this.focusMenuItem(0);
        break;

      case "End":
        e.preventDefault();
        this.focusMenuItem(this.menuItems.length - 1);
        break;

      case "Escape":
        e.preventDefault();
        this.closeMenu();
        break;

      case "Tab":
        // Close menu and allow normal tab navigation
        e.stopPropagation();
        this.closeMenu();
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        this.menuItems[index].click();
        break;
    }
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
