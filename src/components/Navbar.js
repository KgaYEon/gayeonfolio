import { NAV_ITEMS } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

export function Navbar({ onSelect }) {
  const element = createElement(`
    <nav class="navbar" aria-label="Main menu">
      ${NAV_ITEMS.map(({ id, label, enabled }) => `
        <button class="navbar__item" type="button" data-page="${id}" ${enabled ? "" : "disabled"}>${label}</button>
      `).join("")}
    </nav>
  `);
  const items = [...element.querySelectorAll(".navbar__item")];

  items.forEach((item) => {
    item.addEventListener("click", () => onSelect(item.dataset.page));
  });

  return {
    element,
    update({ page }) {
      items.forEach((item) => {
        const active = item.dataset.page === page;
        item.classList.toggle("navbar__item--active", active);
        if (active) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
    },
  };
}
