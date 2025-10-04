export function initTabIndex(element) {
  element.querySelector('[role="menuitem"]').setAttribute("tabindex", "0");
}

export function checkNextTabIndex(element, cb) {
  const curElements = element.querySelectorAll('[role="menuitem"]');
  const elements = Array.from(curElements);
  // because we are using modulo, we need to subtract 1 from length
  const effectiveLength = elements.length - 1;
  // find matching index of focused element
  const curIndex = elements.findIndex((el) => el === document.activeElement);
  // move to next index, wrap around using modulo
  const nextIndex = (curIndex + 1) % curElements.length;

  curElements[nextIndex].setAttribute("tabindex", curIndex);
  curElements[nextIndex].focus();

  if (curIndex === effectiveLength) {
    // callback to close menu if there is no next item
    cb();
  }
}

export function resetTabIndex(element) {
  element.querySelector('[role="menuitem"]').removeAttribute("tabindex");
}
