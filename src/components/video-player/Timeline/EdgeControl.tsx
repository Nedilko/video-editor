import { DURATION_TRACK_WIDTH, MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { useRef, memo } from "react";
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

export const EdgeControl = memo(function EdgeControl({ time, duration, parentWidth, onMove, constraint }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const useGesture = createUseGesture([dragAction])

  useGesture({
    onDrag: ({ offset: [x] }) => {
      onMove(getTimeFromTrackPosition(x, duration, parentWidth, DURATION_TRACK_WIDTH))
    }
  }, {
    target: ref,
    eventOptions: {
      passive: false,
    },
    drag: {
      from: () => [getPositionFromTime(time, duration, parentWidth, DURATION_TRACK_WIDTH), 0],
      bounds: {
        left: (constraint.min * parentWidth) / duration + MEDIA_TYPE_WIDTH - DURATION_TRACK_WIDTH / 2,
        right: constraint.max * parentWidth / duration + MEDIA_TYPE_WIDTH - DURATION_TRACK_WIDTH / 2,
      },
    },
  });

  return (
    <div ref={ref} className="absolute border border-foreground bg-primary-orange rounded touch-none"
         style={{
           height: TRACK_HEIGHT,
           width: DURATION_TRACK_WIDTH,
           left: `${getPositionFromTime(time, duration, parentWidth, DURATION_TRACK_WIDTH, false)}px`
         }}
    />
  )
});
