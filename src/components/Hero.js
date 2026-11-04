import { LOGO_TEXT, TYPE_SPEED } from "../data/content.js";
import { VIEWS, VIEW_ORDER } from "../data/views.js";
import { createElement } from "../lib/createElement.js";
import { startTyping } from "../lib/typewriter.js";
import { Cursor } from "./Cursor.js";
import { DesignPanels } from "./DesignPanels.js";
import { Headline } from "./Headline.js";
import { Selection } from "./Selection.js";
import { SwitchKey } from "./SwitchKey.js";
import { CODE_LENGTH, Terminal } from "./Terminal.js";

export function Hero() {
  // 화면 상태는 여기 한 곳에만 둔다. 리액트로 옮기면 useState가 된다.
  const state = { view: VIEWS.DEFAULT, typed: 0, boxSize: "", fontSize: "" };
  let stopTyping = () => {};

  const element = createElement(`
    <main class="hero">
      <div class="hero__grid" aria-hidden="true" hidden></div>
      <div class="hero__stage"></div>
      <p class="hero__logo">${LOGO_TEXT}</p>
    </main>
  `);
  const grid = element.querySelector(".hero__grid");
  const stage = element.querySelector(".hero__stage");

  const headline = Headline();
  const selection = Selection();
  const terminal = Terminal();
  const switchKey = SwitchKey({ onPress: goToNextView });
  const cursor = Cursor();
  const panels = DesignPanels();

  stage.append(headline.element, selection.element, terminal.element, switchKey.element, cursor.element);
  element.insertBefore(panels.element, stage);

  function render() {
    const isDesign = state.view === VIEWS.DESIGN;
    const isCode = state.view === VIEWS.CODE;

    grid.hidden = !isDesign;
    headline.update({ hidden: isCode });
    selection.update({ visible: isDesign, boxSize: state.boxSize });
    cursor.update({ visible: isDesign });
    panels.update({ visible: isDesign, headlineFontSize: state.fontSize });
    terminal.update({ visible: isCode, typed: state.typed });
    switchKey.update({ view: state.view, lowered: isCode });
  }

  function setState(next) {
    Object.assign(state, next);
    render();
  }

  function measureHeadline() {
    const { size, fontSize } = headline.measure();
    setState({ boxSize: size, fontSize });
  }

  function goToNextView() {
    const index = VIEW_ORDER.indexOf(state.view);
    const view = VIEW_ORDER[(index + 1) % VIEW_ORDER.length];

    stopTyping();
    setState({ view, typed: 0 });

    if (view === VIEWS.DESIGN) measureHeadline();
    if (view === VIEWS.CODE) {
      stopTyping = startTyping({
        length: CODE_LENGTH,
        speed: TYPE_SPEED,
        onType: (typed) => setState({ typed }),
      });
    }
  }

  window.addEventListener("resize", () => {
    if (state.view === VIEWS.DESIGN) measureHeadline();
  });

  render();
  return element;
}
