import { useEffect, useState } from "react";
import { useSize } from "../../lib/contexts/size";

type SizeControllerProps = {
  dim: {
    width: number;
    height: number;
  };
};

export function SizeContoller({ dim }: SizeControllerProps) {
  const { size, setSize } = useSize();
  const maxRatio = 0.9;
  const recommendRatio = 0.75;
  const lowDistanceTreshold = 15;
  const lerpStrength = 0.1;
  const min = 400;
  const [max, setMax] = useState(600);
  const floor = Math.floor;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shorterSide = Math.min(dim.width, dim.height);
    if (window.innerWidth < 640) return setSize(floor(shorterSide));
    const distance = shorterSide - min;
    const newMax = maxRatio * distance + min;
    let recommendSize = recommendRatio * distance + min;

    if (shorterSide === 0) return;
    if (distance < lowDistanceTreshold) {
      setDisabled(true);
      setSize(floor(shorterSide - 15));
      recommendSize = min;
    } else if (disabled) {
      setDisabled(false);
    }

    if (newMax < min) return;
    setMax(floor(newMax));
    if (size > newMax) return setSize(450);
    setSize(floor(lerp(size, recommendSize, lerpStrength)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dim]);

  return (
    <div className="grad-slate hidden border-t-2 border-white bg-gradient-to-t py-1 dark:border-slate-400 sm:grid">
      <label
        htmlFor="sizeControl"
        className="text-center text-sm"
        hidden={disabled}
      >
        Set Board Size
      </label>
      <input
        id="sizeControl"
        type="range"
        className="mx-4 pb-[1px]"
        min={min}
        max={max}
        value={size}
        onChange={(e) => {
          const numVal = Number(e.target.value);
          setSize(floor(numVal));
        }}
        disabled={disabled}
      />
    </div>
  );
}
