import { CURSOR_NAME } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

export function Cursor() {
  const element = createElement(`
    <div class="cursor" aria-hidden="true" hidden>
      <svg class="cursor__arrow" width="22" height="24" viewBox="0 0 22 24">
        <path d="M2 2l7 19 3.2-8L20 10z"></path>
      </svg>
      <span class="cursor__name">${CURSOR_NAME}</span>
    </div>
  `);

  return {
    element,
    update({ visible }) {
      element.hidden = !visible;
    },
  };
}
