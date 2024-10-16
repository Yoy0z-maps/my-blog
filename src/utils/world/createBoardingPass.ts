import { useRouter } from "next/navigation";
import { createOverlay } from "./createOverlay";

export function createBoardingPass(
  e: MouseEvent,
  countryName: string,
  boardingPassCount: number,
  globalOverlay: HTMLDivElement | null
): HTMLDivElement {
  const overlay = createOverlay(globalOverlay);
  boardingPassCount++;

  const tooltip = document.createElement("div");
  tooltip.classList.add("country-tooltip");
  tooltip.style.width = "250px";
  tooltip.style.backgroundColor = "#e6f2ff";
  tooltip.style.borderRadius = "10px";
  tooltip.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  tooltip.style.fontFamily = "Arial, sans-serif";
  tooltip.style.opacity = "0"; // 초기 투명도를 0으로 설정
  tooltip.style.transform = "scale(0)"; // 초기 크기를 0으로 설정
  tooltip.style.transition = "all 0.5s ease-out"; // 트랜지션 효과 추가

  tooltip.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; padding-left: 15px; padding-right: 15px; padding-top: 8px; background-color: #003366; padding-bottom: 4px; border-radius:10px 10px 0px 0px">
      <div style="font-size: 12px; color: #fff;">Boarding Pass</div>
      <div style="font-size: 12px; color: #fff;">JH AIRLINES</div>
    </div>
    <!-- div id="line" style="display:flex; position: relative; height:5px; background-color: #12de23;"></div> -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding-left: 15px; padding-right: 60px">
      <div style="font-size: 10px; color: #000000;">FROM</div>
      <div style="font-size: 10px; color: #000000;">TO</div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 28px; color: #003366; margin-top: -10px; margin-bottom: 12px; padding-left: 15px; padding-right: 15px">
      <div>KOR</div>
      <div style="font-size: 30px;">✈</div>
      <div>CHN</div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding-left: 15px; padding-right: 15px">
      <div style="display: flex; flex-direction: column; align-items:center; justify-content: center;">
        <div style="font-size: 10px; color: #000000;">FLIGHT</div>
        <div style="font-size: 14px; color: #000000;">JH923</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items:center; justify-content: center;">
        <div style="font-size: 10px; color: #000000;">SEAT</div>
        <div style="font-size: 14px; color: #000000;">J09</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items:center; justify-content: center;">
        <div style="font-size: 10px; color: #000000;">GATE</div>
        <div style="font-size: 14px; color: #000000;">23</div>
      </div>
    </div>
    <div style="display: flex; align-items:center; justify-content: start; padding-left:15px">
      <div style="font-size: 10px; color: #000000;">DEP.TIME</div>
      <div style="font-size: 12px; color: #000000; margin-left:4px;">${String(
        new Date().getHours()
      ).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(
    2,
    "0"
  )}</div>
    </div>
    <div style="display: flex; align-items:center; justify-content: start; padding-left:15px">
      <div style="font-size: 10px; color: #000000;">PASENGER</div>
      <div style="font-size: 12px; color: #000000; margin-left:4px;">Y.OU</div>
    </div>
    <div style="text-align: center; margin-bottom: 1px;"><span style="font-size: 10px; color: #fff; background-color:#003366; padding-left:30px; padding-right:30px;">BUSINESS</span></div>
    <div style="display:flex; flex-direction: column; align-items:center; justify-content: center; margin-bottom: 12px;">
      <img src="/images/qr.png" alt="QR Code" style="width: 80px; height: 80px; margin-bottom:1px;">
      <span style="font-size: 10px; color: #000000;">JH:0923/JH</span>
    </div>
  `;

  const actionButton = document.createElement("button");
  actionButton.innerHTML = "✓";
  actionButton.style.position = "absolute";
  actionButton.style.bottom = "5px";
  actionButton.style.left = "13px";
  actionButton.style.background = "none";
  actionButton.style.border = "none";
  actionButton.style.fontSize = "20px";
  actionButton.style.color = "#003366";
  actionButton.style.cursor = "pointer";

  const useHandleActionButtonClick = () => {
    const router = useRouter();
    router.push(`/world/[${countryName}]`);
  };

  actionButton.onclick = useHandleActionButtonClick;
  tooltip.appendChild(actionButton);

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×";
  closeButton.style.position = "absolute";
  closeButton.style.bottom = "5px";
  closeButton.style.right = "13px";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "24px";
  closeButton.style.color = "#003366";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    // 투명도와 크기를 변경하여 툴팁을 부드럽게 사라지게 함
    tooltip.style.opacity = "0";
    tooltip.style.transform = "scale(0)";
    // 트랜지션이 완료된 후 요소 제거
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
      boardingPassCount--;
      if (boardingPassCount === 0 && overlay.parentNode) {
        overlay.style.opacity = "0";
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          globalOverlay = null;
        }, 300); // 300ms는 트랜지션 지속 시간과 일치해야함
      }
    }, 300);
  };
  tooltip.appendChild(closeButton);

  document.body.appendChild(tooltip);
  tooltip.style.position = "absolute";
  // 툴팁의 크기를 계산하여 위치를 조정
  tooltip.style.left = `${e.pageX - tooltip.offsetWidth / 2}px`;
  tooltip.style.top = `${e.pageY - tooltip.offsetHeight + 100}px`;
  tooltip.style.opacity = "0";
  tooltip.style.transform = "scale(0)";
  tooltip.style.transition = "all 0.3s ease-out";
  tooltip.style.zIndex = "1001";
  // 투명도와 크기를 변경하여 툴팁을 부드럽게 나타나게 함
  setTimeout(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "scale(1)";
    overlay.style.opacity = "1";
  }, 0);

  return tooltip;
}
