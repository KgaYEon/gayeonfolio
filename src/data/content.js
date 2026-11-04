export const HEADLINE_LINES = ["Designed in your", "language"];
export const LOGO_TEXT = "Gayeonfolio 2026";

export const HOME_TAB = "home.html";
export const ABOUT_TAB = "about_me.mp4";
export const ABOUT_VIDEO_LABEL = "About me video";
// 영상 파일을 넣고 경로를 적으면 영상이 자리 표시 대신 나타난다. 예: "videos/about-me.mp4"
export const ABOUT_VIDEO_SRC = "";
export const KEY_LABEL = "Switch";
export const CURSOR_NAME = "Gayeon";
export const TERMINAL_TITLE = "gayeon@portfolio";
export const TYPE_SPEED = 10;

export const LAYERS = [
  { name: "Home", type: "Frame", level: 0 },
  { name: "Headline", type: "Text", level: 1, selected: true },
  { name: "Switch key", type: "Button", level: 1 },
  { name: "Logo", type: "Text", level: 1 },
];

export const TYPE_PROPERTIES = [
  { label: "Font", value: "Outfit" },
  { label: "Weight", value: "500 Medium" },
  { label: "Line height", value: "104%" },
  { label: "Letter spacing", value: "-2%" },
];

export const COLOR_PROPERTIES = [
  { label: "Text", value: "F5F5F5" },
  { label: "Key", value: "FF7A1A" },
  { label: "Ground", value: "0B0B0C" },
];

export const CODE_LINES = [
  [
    { text: "const ", tone: "keyword" },
    { text: "yours = ", tone: "plain" },
    { text: '"your language"', tone: "string" },
    { text: ";", tone: "plain" },
  ],
  [
    { text: "console", tone: "plain" },
    { text: ".log", tone: "keyword" },
    { text: "(", tone: "plain" },
    { text: "`Designed in ${yours}`", tone: "string" },
    { text: ");", tone: "plain" },
  ],
  [
    { text: "$ ", tone: "prompt" },
    { text: "node design.js", tone: "plain" },
  ],
  [{ text: "Designed in your language", tone: "output" }],
];
