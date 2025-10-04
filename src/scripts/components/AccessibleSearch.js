/**
 * Search Input with Enhanced Accessibility
 */
export class AccessibleSearch {
  constructor(form) {
    this.form = form;
    this.input = form.querySelector('input[type="search"]');
    this.button = form.querySelector('button[type="submit"]');

    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.input.addEventListener("input", this.handleInput.bind(this));

    // Announce search results to screen readers
    this.createLiveRegion();
  }

  createLiveRegion() {
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "sr-only";
    document.body.appendChild(this.liveRegion);
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = this.input.value.trim();

    if (query) {
      this.announceSearch(query);
      // Simulate search - in real app, this would trigger actual search
      console.log("Searching for:", query);
    }
  }

  handleInput(e) {
    // Clear previous announcements
    clearTimeout(this.announceTimeout);

    // Debounce announcements
    this.announceTimeout = setTimeout(() => {
      const value = e.target.value;
      if (value.length > 2) {
        this.liveRegion.textContent = `${value.length} characters entered`;
      }
    }, 1000);
  }

  announceSearch(query) {
    this.liveRegion.textContent = `Searching for ${query}. Please wait for results.`;
  }
}
