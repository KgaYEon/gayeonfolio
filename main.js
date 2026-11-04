const hero = document.querySelector(".hero");
const key = document.getElementById("switch-key");
const headline = document.getElementById("headline");
const boxSize = document.getElementById("box-size");
const fontSize = document.getElementById("font-size");
const terminalCode = document.getElementById("terminal-code");

const VIEWS = ["default", "design", "code"];
const TYPE_SPEED = 10;

// 터미널에 표시할 코드: [글자, 색]
const CODE_LINES = [
  [["const ", "#7ea6ff"], ["yours", "#f5f5f5"], [" = ", "#f5f5f5"], ['"your language"', "#ffc56b"], [";", "#f5f5f5"]],
  [["console", "#f5f5f5"], [".log", "#7ea6ff"], ["(", "#f5f5f5"], ["`Designed in ${yours}`", "#ffc56b"], [");", "#f5f5f5"]],
  [["$ ", "#ff7a1a"], ["node design.js", "#f5f5f5"]],
  [["Designed in your language", "#ffffff"]],
];

// 글자 조각을 화면에 먼저 만들어 두고, 타이핑은 글자만 채운다
const codeParts = CODE_LINES.flatMap((line) => {
  const row = document.createElement("div");
  terminalCode.append(row);
  return line.map(([text, color]) => {
    const part = document.createElement("span");
    part.style.color = color;
    row.append(part);
    return { element: part, text };
  });
});

const codeLength = codeParts.reduce((sum, part) => sum + part.text.length, 0);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let step = 0;
let typingTimer = null;
let pressTimer = null;

function renderCode(typed) {
  let left = typed;
  codeParts.forEach((part) => {
    part.element.textContent = part.text.slice(0, Math.max(0, left));
    left -= part.text.length;
  });
}

function stopTyping() {
  clearInterval(typingTimer);
  typingTimer = null;
}

function typeCode() {
  stopTyping();
  if (reducedMotion.matches) {
    renderCode(codeLength);
    return;
  }
  let typed = 0;
  renderCode(0);
  typingTimer = setInterval(() => {
    typed += 1;
    renderCode(typed);
    if (typed >= codeLength) stopTyping();
  }, TYPE_SPEED);
}

function measureHeadline() {
  boxSize.textContent = `${Math.round(headline.offsetWidth)} × ${Math.round(headline.offsetHeight)}`;
  fontSize.textContent = `${Math.round(parseFloat(getComputedStyle(headline).fontSize))} px`;
}

function pressKey() {
  clearTimeout(pressTimer);
  key.classList.add("is-pressed");
  pressTimer = setTimeout(() => key.classList.remove("is-pressed"), 170);
}

function goToNextView() {
  step = (step + 1) % VIEWS.length;
  hero.dataset.step = String(step);
  key.setAttribute("aria-label", `Switch key, ${VIEWS[step]} view`);
  stopTyping();
  if (step === 1) measureHeadline();
  if (step === 2) typeCode();
  pressKey();
}

key.addEventListener("click", goToNextView);
window.addEventListener("resize", measureHeadline);
