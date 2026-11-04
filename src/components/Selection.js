import { createElement } from "../lib/createElement.js";

export function Selection() {
  const element = createElement(`
    <div class="selection" aria-hidden="true" hidden>
      <span class="selection__handle selection__handle--top-left"></span>
      <span class="selection__handle selection__handle--top-right"></span>
      <span class="selection__handle selection__handle--bottom-left"></span>
      <span class="selection__handle selection__handle--bottom-right"></span>
      <span class="selection__font">Outfit Medium</span>
      <span class="selection__size"></span>
    </div>
  `);
  const size = element.querySelector(".selection__size");

  return {
    element,
    update({ visible, boxSize }) {
      element.hidden = !visible;
      size.textContent = boxSize;
    },
  };
}
