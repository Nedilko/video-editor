import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { TimeCursor } from "@components/video-player/Timeline/TimeCursor";
import { TimelineBar } from "@components/video-player/Timeline/TimelineBar";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { useDimensions } from "@hooks/useDimensions";
import {
  getEnd,
  getStart,
  getTime,
  goToStart,
  pause,
  setEnd,
  setStart,
  setTimeAndPause,
  setVideoSrc
} from "@store/playback-slice";
import {
  deselectTimeline, getAllTimelines,
  getSelectedTimelineId, getTimelineDuration, removeTimeline,
  setStartEnd
} from "@store/timeline-slice";
import { useCallback, useRef } from "react";
import { toast } from "sonner"

const TIMELINE_PADDING = 8;

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { width: timelineWidth } = useDimensions(ref, MEDIA_TYPE_WIDTH + TIMELINE_PADDING)
  const dispatch = useAppDispatch()
  const mediaFiles = useAppSelector(getAllTimelines)
  const timeCursor = useAppSelector(getTime)
  const selectedId = useAppSelector(getSelectedTimelineId)
  const maxDuration = useAppSelector(getTimelineDuration)
  const playbackStart = useAppSelector(getStart)
  const playbackEnd = useAppSelector(getEnd)

  const handleChangeRange = useCallback((id: string) => async (values: [number, number]) => {
    dispatch(setStartEnd({ id, start: values[0], end: values[1] }))
  }, [dispatch])

  const handleChangeRangeEnded = useCallback(async (values: [number, number]) => {
    dispatch(setStart(values[0]))
    dispatch(setEnd(values[1]))
  }, [dispatch])

  const handleTimeChange = useCallback((value: number) => {
    dispatch(setTimeAndPause(value))
  }, [dispatch])

  const handleRemove = useCallback((id: string, name: string) => () => {
    dispatch(removeTimeline(id))
    dispatch(deselectTimeline())

    dispatch(setVideoSrc(''))
    dispatch(pause())
    dispatch(setStart(0))
    dispatch(setEnd(10))
    dispatch(goToStart())

    toast.error(`Timeline ${name} removed`, {
      action: {
        label: 'close',
        onClick: () => {
        }
      },
    })
  }, [dispatch])

  return (
    <div ref={ref} className="flex flex-col gap-3 pr-2">
      {mediaFiles.length > 0 ? (
        <>
          {mediaFiles.map(({ id, name, url, start, end, duration, type }) => (
            <TimelineBar
              selected={selectedId === id}
              key={id}
              id={id}
              name={name}
              url={url}
              parentWidth={timelineWidth}
              time={timeCursor}
              start={start}
              end={end}
              duration={duration}
              maxDuration={maxDuration}
              mediaType={type}
              onChangeRange={handleChangeRange(id)}
              onChangeRangeEnded={handleChangeRangeEnded}
              onPan={handleTimeChange}
              onRemove={handleRemove(id, name)}
            />
          ))}
          <TimeCursor time={timeCursor} start={playbackStart} end={playbackEnd} duration={maxDuration} parentWidth={timelineWidth} onMove={handleTimeChange}/>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div data-abc={true} className="text-muted-foreground">No files</div>
          <div className="text-muted-foreground">Add some files to start editing</div>
        </div>
      )}
    </div>
  )
}
