import { RefObject, useEffect, useMemo, useState } from "react";

export const useDimensions = (ref: RefObject<HTMLElement>, marginX: number = 0, marginY: number = 0 ) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const obs = useMemo(() => new ResizeObserver(() => {
    if (!ref.current) {
      return;
    }
    setWidth(ref.current.clientWidth - marginX)
    setHeight(ref.current.clientHeight - marginY)
  }), [marginX, marginY, ref])

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [obs, ref]);

  return {
    width,
    height
  }
}