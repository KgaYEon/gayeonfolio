import { CODE_LINES, TERMINAL_TITLE } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

const CODE_PARTS = CODE_LINES.flat();
export const CODE_LENGTH = CODE_PARTS.reduce((sum, part) => sum + part.text.length, 0);

export function Terminal() {
  const element = createElement(`
    <section class="terminal" aria-label="Code view" hidden>
      <div class="terminal__bar">
        <span class="terminal__dots" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="terminal__title">${TERMINAL_TITLE}</span>
      </div>
      <pre class="terminal__code">${CODE_LINES.map((line) => `
        <div class="terminal__line">${line.map(({ tone }) => `<span class="terminal__part--${tone}"></span>`).join("")}</div>
      `.trim()).join("")}</pre>
    </section>
  `);
  const parts = [...element.querySelectorAll(".terminal__line span")];

  return {
    element,
    update({ visible, typed }) {
      element.hidden = !visible;

      let left = typed;
      CODE_PARTS.forEach((part, index) => {
        parts[index].textContent = part.text.slice(0, Math.max(0, left));
        left -= part.text.length;
      });
    },
  };
}
