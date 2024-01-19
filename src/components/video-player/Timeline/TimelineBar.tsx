import { MediaType } from "@/types";
import { ConfirmRemoveDialog } from "@components/Dialogs/ConfirmRemoveDialog";
import {
  CONTROLS_APPROACH_MARGIN,
  MEDIA_TYPE_WIDTH,
  TIME_TRACK_WIDTH
} from "@components/video-player/Timeline/constants";
import { EdgeControl } from "@components/video-player/Timeline/EdgeControl";
import { InfoDialog } from "@components/Dialogs/InfoDialog";
import { Range } from "@components/video-player/Timeline/Range";
import { TimelineBarContextMenu } from "@components/video-player/Timeline/TimelineBarContextMenu";
import { Track } from "@components/video-player/Timeline/Track";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { useDisclosure } from "@hooks/useDisclosure";
import { useCallback, useRef, useState } from "react";
import { createUseGesture, wheelAction } from '@use-gesture/react'

type Props = {
  name: string
  url: string
  parentWidth: number
  duration: number
  maxDuration: number
  mediaType: MediaType
  time: number
  start: number
  end: number
  onChangeRange: (values: [number, number]) => void
  onPan: (value: number) => void
  onRemove: () => void
}

export const TimelineBar = ({
                              name,
                              url,
                              parentWidth,
                              duration,
                              maxDuration,
                              mediaType,
                              time,
                              start,
                              end,
                              onChangeRange,
                              onPan,
                              onRemove
                            }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  const useGesture = createUseGesture([wheelAction])
  const [isInfoModalOpened, { open: openInfoDialog, close: closeInfoDialog }] = useDisclosure()
  const [confirmRemoveDialog, { open: openConfirmRemoveDialog, close: closeConfirmRemoveDialog }] = useDisclosure()

  const [clickedX, setClickedX] = useState(0)

  useGesture({
    onWheel: ({ offset: [x], direction: [directionX] }) => {
      if (directionX) {
        onPan(getTimeFromTrackPosition(x, maxDuration, parentWidth, TIME_TRACK_WIDTH))
      }
    },
    onMouseDown: ({ event }) => {
      event.stopPropagation()
      setClickedX(event.clientX)
    },
    onMouseUp: ({ event }) => {
      if (event.clientX === clickedX) {
        const x = event.clientX - MEDIA_TYPE_WIDTH - 32
        onPan(getTimeFromTrackPosition(x, maxDuration, parentWidth, TIME_TRACK_WIDTH))
      }
    },
  }, {
    target: ref,
    eventOptions: { passive: false },
    wheel: {
      from: () => [getPositionFromTime(time, maxDuration, parentWidth, TIME_TRACK_WIDTH), 0],
      bounds: {
        left: MEDIA_TYPE_WIDTH - TIME_TRACK_WIDTH / 2,
        right: parentWidth + MEDIA_TYPE_WIDTH - TIME_TRACK_WIDTH / 2,
      },
      preventScroll: true,
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
    <TimelineBarContextMenu onRemove={openConfirmRemoveDialog} onInfo={openInfoDialog}>
      <Track ref={ref} mediaType={mediaType}>
        <Range
          startTime={startTime}
          endTime={endTime}
          duration={maxDuration}
          parentWidth={parentWidth}
          handleDrag={([start, end]) => {
            handleChangeStartTime(start)
            handleChangeEndTime(end)
          }}
        />
        <EdgeControl time={startTime} duration={maxDuration} parentWidth={parentWidth} onMove={handleChangeStartTime}
                     constraint={{ min: 0, max: endTime - CONTROLS_APPROACH_MARGIN }}/>
        <EdgeControl time={endTime} duration={maxDuration} parentWidth={parentWidth} onMove={handleChangeEndTime}
                     constraint={{ min: startTime + CONTROLS_APPROACH_MARGIN, max: duration }}/>
      </Track>
      <InfoDialog open={isInfoModalOpened} onClose={closeInfoDialog} duration={duration} type={mediaType} name={name} url={url}
                  start={start} end={end}/>
      <ConfirmRemoveDialog open={confirmRemoveDialog} onClose={closeConfirmRemoveDialog} onConfirm={onRemove}/>
    </TimelineBarContextMenu>
  )
};
