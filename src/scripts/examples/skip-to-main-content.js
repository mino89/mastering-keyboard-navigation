export function initSkipContent(element) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    focusMainContent(element);
  });
  element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      focusMainContent(element);
    }
  });
}

export function focusMainContent(element) {
  const targetId = element.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);
  if (target) {
    // move to main content
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    // we use preventScroll to avoid jumping since we already scrolled
    target.focus({ preventScroll: true });
    // Remove tabindex after focus to clean up
    resetTabindex(target);
  }
}

export function resetTabindex(element) {
  element.addEventListener(
    "blur",
    () => {
      element.removeAttribute("tabindex");
    },
    { once: true },
  );
}
