import { useEffect, useState } from "react";

export default function useContextMenu(ref, openContextMenu, closeContextMenu) {
  const [menuPosition, setMenuPosition] = useState(null);

  useEffect(() => {
    const elementRef = ref.current;
    if (!elementRef) return;
  
    const handleRightClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openContextMenu();
      const containerRect = elementRef.getBoundingClientRect();
      setMenuPosition({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      });
    };
  
    const handleClick = () => {
      setMenuPosition(null);
      closeContextMenu();
    };
  
    elementRef.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("click", handleClick);
  
    return () => {
      elementRef.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("click", handleClick);
    };
  }, [ref.current]);

  return { menuPosition };
}
