const MIN_WHEEL_DELTA = 4;
const MIN_SWIPE = 30;
const WHEEL_GESTURE_GAP = 120;

// 스크롤 한 번을 한 번의 페이지 이동으로 바꾼다. 리액트로 옮기면 useEffect 안에서 쓴다.
export function onPageScroll({ onNext, onPrevious }) {
  let lastWheelTime = 0;
  let gestureUsed = false;
  let touchStartY = null;

  const move = (direction) => (direction > 0 ? onNext() : onPrevious());

  function handleWheel(event) {
    // 트랙패드는 손을 뗀 뒤에도 신호가 이어지므로, 신호가 멈춰야 다음 동작으로 본다
    if (event.timeStamp - lastWheelTime > WHEEL_GESTURE_GAP) gestureUsed = false;
    lastWheelTime = event.timeStamp;

    if (gestureUsed || Math.abs(event.deltaY) < MIN_WHEEL_DELTA) return;
    gestureUsed = true;
    move(event.deltaY);
  }

  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartY === null) return;
    const distance = touchStartY - event.changedTouches[0].clientY;
    touchStartY = null;
    if (Math.abs(distance) >= MIN_SWIPE) move(distance);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "PageDown") move(1);
    if (event.key === "ArrowUp" || event.key === "PageUp") move(-1);
  }

  window.addEventListener("wheel", handleWheel, { passive: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("keydown", handleKeyDown);
  };
}
