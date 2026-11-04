import { COLOR_PROPERTIES, LAYERS, TYPE_PROPERTIES } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

function layerRow({ name, type, level, selected }) {
  const className = [
    "panel__row",
    level > 0 && "panel__row--child",
    selected && "panel__row--selected",
  ].filter(Boolean).join(" ");

  return `<div class="${className}"><span>${name}</span><span class="panel__type">${type}</span></div>`;
}

function propertyRow({ label, value }) {
  return `<div class="panel__row"><span class="panel__label">${label}</span><span>${value}</span></div>`;
}

function colorRow({ label, value }) {
  return `
    <div class="panel__row">
      <span class="panel__label">${label}</span>
      <span class="panel__color">
        <span class="panel__swatch" style="background: #${value}"></span>${value}
      </span>
    </div>
  `;
}

export function DesignPanels() {
  const element = createElement(`
    <div class="design-panels" hidden>
      <aside class="panel panel--left" aria-label="Layers">
        <p class="panel__title">Layers</p>
        ${LAYERS.map(layerRow).join("")}
      </aside>
      <aside class="panel panel--right" aria-label="Design properties">
        <p class="panel__title">Design</p>
        ${TYPE_PROPERTIES.map(propertyRow).join("")}
        <div class="panel__row">
          <span class="panel__label">Size</span>
          <span class="panel__font-size"></span>
        </div>
        <div class="panel__divider"></div>
        ${COLOR_PROPERTIES.map(colorRow).join("")}
      </aside>
    </div>
  `);
  const fontSize = element.querySelector(".panel__font-size");

  return {
    element,
    update({ visible, headlineFontSize }) {
      element.hidden = !visible;
      fontSize.textContent = headlineFontSize;
    },
  };
}
