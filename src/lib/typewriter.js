// 글자 수를 하나씩 늘려 전달한다. 리액트로 옮기면 useEffect 안에서 쓴다.
export function startTyping({ length, speed, onType }) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    onType(length);
    return () => {};
  }

  let typed = 0;
  onType(typed);

  const timer = setInterval(() => {
    typed += 1;
    onType(typed);
    if (typed >= length) clearInterval(timer);
  }, speed);

  return () => clearInterval(timer);
}
