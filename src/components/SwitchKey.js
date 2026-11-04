import { KEY_LABEL } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

const PRESS_TIME = 170;

export function SwitchKey({ onPress }) {
  const element = createElement(`
    <button class="switch-key" type="button">
      <span class="switch-key__face">
        <span class="switch-key__label">${KEY_LABEL}</span>
      </span>
    </button>
  `);
  let pressTimer;

  element.addEventListener("click", () => {
    clearTimeout(pressTimer);
    element.classList.add("switch-key--pressed");
    pressTimer = setTimeout(() => element.classList.remove("switch-key--pressed"), PRESS_TIME);
    onPress();
  });

  return {
    element,
    update({ view, lowered }) {
      element.setAttribute("aria-label", `Switch key, ${view} view`);
      element.classList.toggle("switch-key--lowered", lowered);
    },
  };
}
