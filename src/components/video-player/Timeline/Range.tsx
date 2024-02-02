import { getPositionFromTime } from "@components/video-player/Timeline/utils";
import { memo, useRef } from "react";
import { createUseGesture, dragAction } from '@use-gesture/react'

type Props = {
  startTime: number;
  endTime: number;
  duration: number;
  parentWidth: number;
  handleDrag: (value: [number, number]) => void;
  handleDragEnd: (value: [number, number]) => void;
}

export const Range = memo(function Range({
                                           startTime,
                                           endTime,
                                           duration,
                                           parentWidth,
                                           handleDrag,
                                           handleDragEnd
                                         }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const start = getPositionFromTime(startTime, duration, parentWidth, 0, false)
  const end = getPositionFromTime(endTime, duration, parentWidth, 0, false)
  const useGesture = createUseGesture([dragAction])

  useGesture({
    onDrag: ({ offset: [x] }) => {
      const newStart = x
      const newEnd = x + end - start
      handleDrag([(newStart / parentWidth) * duration, (newEnd / parentWidth) * duration])
    },
    onDragEnd: ({ offset: [x] }) => {
      const newStart = x
      const newEnd = x + end - start
      handleDragEnd([(newStart / parentWidth) * duration, (newEnd / parentWidth) * duration])
    },
  }, {
    target: ref,
    eventOptions: { passive: false },
    drag: {
      from: () => [getPositionFromTime(startTime, duration, parentWidth, 0, false), 0],
      bounds: {
        left: 0,
        right: parentWidth - (endTime - startTime) / duration * parentWidth,
      },
    },
  });

  return <div ref={ref} className="absolute bg-primary/20 h-[84px] touch-none" style={{
    left: `${start}px`,
    width: `${end - start}px`
  }}/>;
});