import { MediaType } from "@/types";
import { CONTROLS_APPROACH_MARGIN, MEDIA_TYPE_WIDTH, TRACK_WIDTH } from "@components/video-player/Timeline/constants";
import { EdgeControl } from "@components/video-player/Timeline/EdgeControl";
import { Range } from "@components/video-player/Timeline/Range";
import { Track } from "@components/video-player/Timeline/Track";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { useCallback, useRef, useState } from "react";
import { createUseGesture, wheelAction } from '@use-gesture/react'

type Props = {
  parentWidth: number
  duration: number
  mediaType: MediaType
  time: number
  start: number
  end: number
  onChangeRange: (values: [number, number]) => void
  onPan: (value: number) => void
}

export const TimelineBar = ({ parentWidth, duration, mediaType, time, start, end, onChangeRange, onPan }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const width = parentWidth - 24
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  const [timePosition, setTimePosition] = useState(getPositionFromTime(time, duration, parentWidth))
  const useGesture = createUseGesture([wheelAction])

  const [clickedX, setClickedX] = useState(0)

  useGesture({
    onWheel: ({ offset: [x],  }) => {
      setTimePosition(x)
      onPan(getTimeFromTrackPosition(x, duration, parentWidth))
    },
    onMouseDown: ({ event }) => {
      event.stopPropagation()
      setClickedX(event.clientX)
    },
    onMouseUp: ({ event }) => {
      if (event.clientX === clickedX) {
        const x = event.clientX - MEDIA_TYPE_WIDTH - 32
        setTimePosition(x)
        onPan(getTimeFromTrackPosition(x, duration, parentWidth))
      }
    }
  }, {
    target: ref,
    eventOptions: { passive: false },
    wheel: {
      from: () => [timePosition, 0],
      bounds: {
        left: MEDIA_TYPE_WIDTH - TRACK_WIDTH / 2,
        right: parentWidth + MEDIA_TYPE_WIDTH - TRACK_WIDTH / 2,
      },
    },

  });

  const handleChangeStartTime = useCallback((value: number) => {
    setStartTime(value)
    onChangeRange([value, endTime])
  }, [endTime, onChangeRange])

  const handleChangeEndTime = useCallback((value: number) => {
    setEndTime(value)
    onChangeRange([startTime, value])
  }, [onChangeRange, startTime])

  return (
    <Track ref={ref} mediaType={mediaType}>
      <Range
        startTime={startTime}
        endTime={endTime}
        duration={duration}
        parentWidth={width}
        handleDrag={([start, end]) => {
          handleChangeStartTime(start)
          handleChangeEndTime(end)
        }}
      />
      <EdgeControl time={startTime} duration={duration} parentWidth={width} onMove={handleChangeStartTime}
                   constraint={{ min: 0, max: endTime - CONTROLS_APPROACH_MARGIN }}/>
      <EdgeControl time={endTime} duration={duration} parentWidth={width} onMove={handleChangeEndTime}
                   constraint={{ min: startTime + CONTROLS_APPROACH_MARGIN, max: duration }}/>
    </Track>
  )
};
