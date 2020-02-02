import { useState, useEffect, useRef } from "react";

export default function useTime(): number {
  const [time, setTime] = useState(performance.now());
  const ref = useRef<number>(0);

  useEffect(() => {
    const cb = () => {
      setTime(performance.now());
      ref.current = window.requestAnimationFrame(cb);
    };
    ref.current = window.requestAnimationFrame(cb);
    return () => window.cancelAnimationFrame(ref.current);
  }, []);

  return time / 1000;
}
