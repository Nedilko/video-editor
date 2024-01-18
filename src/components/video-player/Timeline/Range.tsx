import { memo, useEffect, useRef, useState } from "react";
import { createUseGesture, dragAction } from '@use-gesture/react'

type Props = {
  startTime: number;
  endTime: number;
  duration: number;
  parentWidth: number;
  handleDrag: (value: [number, number]) => void;
}

export const Range = memo(function Range({startTime, endTime, duration, parentWidth, handleDrag}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState((startTime / duration) * parentWidth)
  const [end, setEnd] = useState((endTime / duration) * parentWidth)
  const useGesture = createUseGesture([dragAction])

  useEffect(() => {
    setStart((startTime / duration) * parentWidth)
    setEnd((endTime / duration) * parentWidth)
  }, [duration, endTime, parentWidth, startTime]);

  useGesture({
    onDrag: ({ offset: [x] }) => {
      const newStart = x
      const newEnd = x + end - start
      setStart(newStart)
      setEnd(newEnd)
      handleDrag([(newStart / parentWidth) * duration, (newEnd / parentWidth) * duration])
    },
  }, {
    target: ref,
    eventOptions: { passive: false },
    drag: {
      from: () => [(startTime / duration) * parentWidth, 0],
      bounds: {
        left: 0,
        right: parentWidth - (endTime - startTime) / duration * parentWidth,
      },
    },
  });

  return <div ref={ref} className="absolute bg-primary/20 h-[84px] touch-none" style={{
    left: `${start}px`,
    width: `${end - start}px`
  }} />;
});