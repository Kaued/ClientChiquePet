import { useLayoutEffect, useState } from "react";

export interface SizeValues {
  width: number;
  height: number;
}
export const useWindowSize = () => {
  const [size, setSize] = useState<SizeValues>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
