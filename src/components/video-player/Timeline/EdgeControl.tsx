import { useEffect, useRef, useState, memo } from "react";
import { createUseGesture, dragAction } from '@use-gesture/react'

type Props = {
  time: number
  duration: number
  parentWidth: number
  onMove: (time: number) => void
  constraint: {
    min: number
    max: number
  }
}

const TRACK_HEIGHT = 84
const TRACK_WIDTH = 8

export const EdgeControl = memo(function EdgeControl({ time, duration, parentWidth, onMove, constraint }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<number>((time / duration) * parentWidth)
  const useGesture = createUseGesture([dragAction])

  useEffect(() => {
    setPosition((time / duration) * parentWidth)
  }, [duration, parentWidth, time]);

  useGesture({
    onDrag: ({ offset: [x] }) => {
      setPosition(x)
        onMove((x / parentWidth) * duration)
    }
  }, {
    target: ref,
    eventOptions: {
      passive: false,
    },
    drag: {
      from: () => [(time / duration) * parentWidth, 0],
      bounds: {
        left: constraint.min * parentWidth / duration,
        right: constraint.max * parentWidth / duration,
      },
    },
  });

  return (
    <div ref={ref} className="absolute border border-foreground bg-primary-orange rounded touch-none"
         style={{
           height: TRACK_HEIGHT,
           width: TRACK_WIDTH,
           left: `${position - TRACK_WIDTH / 2}px`
         }}
    />
  )
});
