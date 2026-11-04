import { HEADLINE_LINES } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

export function Headline() {
  const element = createElement(`
    <h1 class="headline">
      ${HEADLINE_LINES.map((line) => `<span class="headline__line">${line}</span>`).join("")}
    </h1>
  `);

  return {
    element,
    update({ hidden }) {
      element.classList.toggle("headline--hidden", hidden);
    },
    measure() {
      return {
        size: `${element.offsetWidth} × ${element.offsetHeight}`,
        fontSize: `${Math.round(parseFloat(getComputedStyle(element).fontSize))} px`,
      };
    },
  };
}
