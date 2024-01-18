import { MEDIA_TYPE_WIDTH, TRACK_WIDTH } from "@components/video-player/Timeline/constants";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { memo, useEffect, useRef, useState } from "react";
import { createUseGesture, dragAction } from '@use-gesture/react'

type Props = {
  time: number
  duration: number
  parentWidth: number
  onMove: (time: number) => void
}

export const TimeCursor = memo((({ time, duration, parentWidth, onMove }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(getPositionFromTime(time, duration, parentWidth))
  const useGesture = createUseGesture([dragAction])

  useEffect(() => {
    setPosition(getPositionFromTime(time, duration, parentWidth))
  }, [duration, parentWidth, time]);

  useGesture({
    onDrag: ({ offset: [x] }) => {
      setPosition(x)
      onMove(getTimeFromTrackPosition(x, duration, parentWidth))
    }
  }, {
    target: ref,
    eventOptions: { passive: false },
    drag: {
      from: () => [position, 0],
      bounds: {
        left: MEDIA_TYPE_WIDTH - TRACK_WIDTH / 2,
        right: parentWidth + MEDIA_TYPE_WIDTH - TRACK_WIDTH / 2,
      },
    },
  });

  return (
    <div ref={ref}
         className="absolute top-0 bottom-0 touch-none flex flex-col items-center h-full"
         style={{
           left: `${position}px`,
           width: TRACK_WIDTH,
         }}>
      <div className="flex h-full w-[1px] bg-primary bg-opacity-50"/>
      <div className="w-0 h-0 -translate-y-0.5
      border-l-[6px] border-l-transparent
      border-b-[10px] border-b-primary
      border-r-[6px] border-r-transparent"
      >
      </div>
    </div>
  )
}));
