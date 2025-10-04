/**
 * Product Card Accessibility Enhancement
 */
export class AccessibleProductCard {
  constructor(card) {
    this.card = card;
    this.addToCartButton = card.querySelector(".btn-primary");
    this.productLink = card.querySelector(".product-link");

    this.init();
  }

  init() {
    // Enhance add to cart functionality
    if (this.addToCartButton) {
      this.addToCartButton.addEventListener(
        "click",
        this.handleAddToCart.bind(this),
      );
    }

    // Add keyboard support for card navigation
    this.card.addEventListener("keydown", this.handleCardKeydown.bind(this));
  }

  handleAddToCart(e) {
    e.preventDefault();

    const productName = this.productLink.textContent.trim();

    // Simulate adding to cart
    this.announceCartUpdate(productName);
    this.updateCartBadge();

    // Visual feedback
    this.showAddedFeedback();
  }

  handleCardKeydown(e) {
    // Allow Enter key to activate the main product link when card is focused
    if (e.key === "Enter" && e.target === this.card) {
      e.preventDefault();
      this.productLink.click();
    }
  }

  announceCartUpdate(productName) {
    // Create temporary announcement
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "assertive");
    announcement.className = "sr-only";
    announcement.textContent = `${productName} has been added to your cart`;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");
    if (cartBadge) {
      const currentCount = parseInt(cartBadge.textContent) || 0;
      cartBadge.textContent = currentCount + 1;

      // Update cart button aria-label
      const cartButton = cartBadge.closest("button");
      if (cartButton) {
        cartButton.setAttribute(
          "aria-label",
          `Shopping cart (${currentCount + 1} items)`,
        );
      }
    }
  }

  showAddedFeedback() {
    const originalText = this.addToCartButton.textContent;
    this.addToCartButton.textContent = "Added!";
    this.addToCartButton.disabled = true;

    setTimeout(() => {
      this.addToCartButton.textContent = originalText;
      this.addToCartButton.disabled = false;
    }, 2000);
  }
}
