import { MediaType } from "@/types";
import { ConfirmRemoveDialog } from "@components/Dialogs/ConfirmRemoveDialog";
import {
  CONTROLS_APPROACH_MARGIN,
  MEDIA_TYPE_WIDTH,
  TIME_TRACK_WIDTH
} from "@components/video-player/Timeline/constants";
import { EdgeControl } from "@components/video-player/Timeline/EdgeControl";
import { TimelineInfoDialog } from "@components/Dialogs/TimelineInfoDialog";
import { Range } from "@components/video-player/Timeline/Range";
import { TimelineBarContextMenu } from "@components/video-player/Timeline/TimelineBarContextMenu";
import { Track } from "@components/video-player/Timeline/Track";
import { getPositionFromTime, getTimeFromTrackPosition } from "@components/video-player/Timeline/utils";
import { useAppDispatch } from "@hooks/store";
import { useDisclosure } from "@hooks/useDisclosure";
import { setIsSeeking } from "@store/playback-slice";
import { selectTimeline } from "@store/timeline-slice";
import { useCallback, useRef, useState } from "react";
import { createUseGesture, wheelAction } from '@use-gesture/react'

type Props = {
  id: string
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
  onChangeRangeEnded: (values: [number, number]) => void
  onPan: (value: number) => void
  onRemove: () => void
  selected: boolean
}

export const TimelineBar = ({
                              id,
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
                              onChangeRangeEnded,
                              onPan,
                              onRemove,
                              selected
                            }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  const useGesture = createUseGesture([wheelAction])
  const [isInfoModalOpened, { open: openInfoDialog, close: closeInfoDialog }] = useDisclosure()
  const [confirmRemoveDialog, { open: openConfirmRemoveDialog, close: closeConfirmRemoveDialog }] = useDisclosure()
  const dispatch = useAppDispatch()

  const [clickedX, setClickedX] = useState(0)

  useGesture({
    onWheel: ({ offset: [x], direction: [directionX] }) => {
      if (directionX) {
        onPan(getTimeFromTrackPosition(x, maxDuration, parentWidth, TIME_TRACK_WIDTH))
      }
    },
    onWheelStart: () => {
      dispatch(setIsSeeking(true))
    },
    onWheelEnd: () => {
      dispatch(setIsSeeking(false))
    },
    onMouseDown: ({ event }) => {
      event.stopPropagation()
      setClickedX(event.clientX)
    },
    onMouseUp: ({ event }) => {
      if (event.clientX === clickedX) {
        const x = event.clientX - MEDIA_TYPE_WIDTH - 32
        const newTime = getTimeFromTrackPosition(x, maxDuration, parentWidth, TIME_TRACK_WIDTH)

        if (newTime > end) {
          onPan(end)
        } else if (newTime < start) {
          onPan(start)
        } else {
          onPan(newTime)
        }

        dispatch(selectTimeline(id))
      }
    },
    onClick: ({ event }) => {
      event.stopPropagation()
    }
  }, {
    target: ref,
    eventOptions: { passive: false },
    wheel: {
      from: () => [getPositionFromTime(time, maxDuration, parentWidth, TIME_TRACK_WIDTH), 0],
      bounds: {
        left: getPositionFromTime(start, maxDuration, parentWidth, TIME_TRACK_WIDTH),
        right: getPositionFromTime(end, maxDuration, parentWidth, TIME_TRACK_WIDTH),
      },
      preventScroll: true,
    },
  });

  const handleChangeStartTime = useCallback((value: number) => {
    setStartTime(value)
    onChangeRange([value, endTime])
  }, [endTime, onChangeRange])

  const handleChangeStartTimeEnded = useCallback((value: number) => {
    onChangeRangeEnded([value, endTime])
  }, [endTime, onChangeRangeEnded])

  const handleChangeEndTime = useCallback((value: number) => {
    setEndTime(value)
    onChangeRange([startTime, value])
  }, [onChangeRange, startTime])

  const handleChangeEndTimeEnded = useCallback((value: number) => {
    onChangeRangeEnded([startTime, value])
  }, [onChangeRangeEnded, startTime])

  return (
    <TimelineBarContextMenu onRemove={openConfirmRemoveDialog} onInfo={openInfoDialog}>
      <Track ref={ref} mediaType={mediaType} selected={selected}>
        <Range
          startTime={startTime}
          endTime={endTime}
          duration={maxDuration}
          parentWidth={parentWidth}
          handleDrag={([start, end]) => {
            handleChangeStartTime(start)
            handleChangeEndTime(end)
          }}
          handleDragEnd={([start, end]) => {
            handleChangeStartTimeEnded(start)
            handleChangeEndTimeEnded(end)
          }}
        />
        <EdgeControl
          time={startTime}
          duration={maxDuration}
          parentWidth={parentWidth}
          onMove={handleChangeStartTime}
          onMoveEnd={handleChangeStartTimeEnded}
          constraint={{ min: 0, max: endTime - CONTROLS_APPROACH_MARGIN }}
        />
        <EdgeControl
          time={endTime}
          duration={maxDuration}
          parentWidth={parentWidth}
          onMove={handleChangeEndTime}
          onMoveEnd={handleChangeEndTimeEnded}
          constraint={{ min: startTime + CONTROLS_APPROACH_MARGIN, max: duration }}
        />
      </Track>
      <TimelineInfoDialog open={isInfoModalOpened} onClose={closeInfoDialog} duration={duration} type={mediaType}
                          name={name}
                          url={url}
                          start={start} end={end}/>
      <ConfirmRemoveDialog open={confirmRemoveDialog} onClose={closeConfirmRemoveDialog} onConfirm={onRemove}/>
    </TimelineBarContextMenu>
  )
};
