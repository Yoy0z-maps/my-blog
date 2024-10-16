import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BoardingPassProps {
  x: number;
  y: number;
  text: string;
}

const BoardingPass: React.FC<BoardingPassProps> = ({ x, y, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return createPortal(
    <div
      style={{
        display: "block",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "10px",
        maxWidth: "200px",
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0})`,
        transition: "all 0.3s ease-out",
      }}
    >
      {text}
      <button onClick={() => setIsVisible(false)}>close</button>
    </div>,
    document.body
  );
};

export default BoardingPass;
