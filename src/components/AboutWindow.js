import { ABOUT_TAB, ABOUT_VIDEO_LABEL, ABOUT_VIDEO_SRC, HOME_TAB } from "../data/content.js";
import { createElement } from "../lib/createElement.js";

function videoMarkup() {
  if (ABOUT_VIDEO_SRC) {
    return `<video class="about-window__video" src="${ABOUT_VIDEO_SRC}" controls playsinline preload="metadata"></video>`;
  }

  return `
    <div class="about-window__placeholder">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="24" cy="24" r="22"></circle>
        <path d="M19 15l14 9-14 9z"></path>
      </svg>
      <span>${ABOUT_VIDEO_LABEL}</span>
    </div>
  `;
}

export function AboutWindow({ onClose }) {
  const element = createElement(`
    <section class="about-window" aria-label="About me" hidden>
      <div class="about-window__bar">
        <span class="about-window__dots" aria-hidden="true"><span></span><span></span><span></span></span>
        <button class="about-window__tab" type="button" data-close>${HOME_TAB}</button>
        <div class="about-window__tab about-window__tab--new">
          <span>${ABOUT_TAB}</span>
          <button class="about-window__close" type="button" aria-label="Close tab" data-close>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"></path></svg>
          </button>
        </div>
      </div>
      <div class="about-window__body">${videoMarkup()}</div>
    </section>
  `);
  const video = element.querySelector("video");

  element.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", onClose);
  });

  return {
    element,
    update({ visible }) {
      element.hidden = !visible;
      if (!visible && video) video.pause();
    },
  };
}
