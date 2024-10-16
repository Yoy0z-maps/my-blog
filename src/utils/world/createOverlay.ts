export function createOverlay(
  globalOverlay: HTMLDivElement | null
): HTMLDivElement {
  if (!globalOverlay) {
    globalOverlay = document.createElement("div");
    globalOverlay.style.position = "fixed";
    globalOverlay.style.top = "0";
    globalOverlay.style.left = "0";
    globalOverlay.style.width = "100%";
    globalOverlay.style.height = "100%";
    globalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    globalOverlay.style.opacity = "0";
    globalOverlay.style.transition = "opacity 0.3s ease-out";
    globalOverlay.style.pointerEvents = "none";
    globalOverlay.style.zIndex = "1000";
    document.body.appendChild(globalOverlay);
  }
  return globalOverlay;
}
