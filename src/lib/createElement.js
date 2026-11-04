// HTML 문자열을 요소로 바꾼다. 리액트로 옮기면 이 파일은 JSX로 대체된다.
export function createElement(markup) {
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}
