import { MEDIA_TYPE_WIDTH, TIME_TRACK_WIDTH } from "@components/video-player/Timeline/constants";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { memo, useRef } from "react";
import { createUseGesture, dragAction } from '@use-gesture/react'

type Props = {
  time: number
  duration: number
  parentWidth: number
  onMove: (time: number) => void
}

export const TimeCursor = memo((({ time, duration, parentWidth, onMove }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const useGesture = createUseGesture([dragAction])

  useGesture({
    onDrag: ({ offset: [x] }) => {
      onMove(getTimeFromTrackPosition(x, duration, parentWidth, TIME_TRACK_WIDTH))
    }
  }, {
    target: ref,
    eventOptions: { passive: false },
    drag: {
      from: () => [getPositionFromTime(time, duration, parentWidth, TIME_TRACK_WIDTH), 0],
      bounds: {
        left: MEDIA_TYPE_WIDTH - TIME_TRACK_WIDTH / 2,
        right: parentWidth + MEDIA_TYPE_WIDTH - TIME_TRACK_WIDTH / 2,
      },
    },
  });

  return (
    <div ref={ref}
         className="absolute top-0 bottom-0 touch-none flex flex-col items-center h-full"
         style={{
           left: `${getPositionFromTime(time, duration, parentWidth, TIME_TRACK_WIDTH)}px`,
           width: TIME_TRACK_WIDTH,
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
