import { createElement } from "../lib/createElement.js";
import { onPageScroll } from "../lib/pageScroll.js";
import { AboutWindow } from "./AboutWindow.js";
import { Hero } from "./Hero.js";

// 각 장면과 머무는 시간(ms). CSS의 애니메이션 시간과 맞춘다.
const TO_ABOUT = [["collapsing", 560], ["dot", 160], ["opening", 640], ["about", 0]];
const TO_HOME = [["closing", 420], ["dot", 120], ["expanding", 520], ["home", 0]];

const HERO_STAGES = ["home", "collapsing", "expanding"];
const WINDOW_STAGES = ["opening", "about", "closing"];

export function App() {
  const element = createElement(`
    <div class="app" data-stage="home">
      <span class="app__dot" aria-hidden="true"></span>
    </div>
  `);
  const hero = Hero();
  const aboutWindow = AboutWindow({ onClose: () => goTo("home") });
  let page = "home";
  let moving = false;

  element.prepend(hero);
  element.append(aboutWindow.element);

  function setStage(stage) {
    element.dataset.stage = stage;
    hero.hidden = !HERO_STAGES.includes(stage);
    aboutWindow.update({ visible: WINDOW_STAGES.includes(stage) });
  }

  function playStages(stages) {
    const [[stage, time], ...rest] = stages;
    setStage(stage);

    if (rest.length === 0) {
      moving = false;
      return;
    }
    setTimeout(() => playStages(rest), time);
  }

  function goTo(target) {
    if (moving || page === target) return;
    page = target;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(target);
      return;
    }

    moving = true;
    playStages(target === "about" ? TO_ABOUT : TO_HOME);
  }

  onPageScroll({
    onNext: () => goTo("about"),
    onPrevious: () => goTo("home"),
  });

  setStage("home");
  return element;
}
