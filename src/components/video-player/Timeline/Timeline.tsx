import { MediaFileData } from "@/types";
import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { TimeCursor } from "@components/video-player/Timeline/TimeCursor";
import { TimelineBar } from "@components/video-player/Timeline/TimelineBar";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  files: MediaFileData[]
}

export const Timeline = ({files}: Props) => {
  const [timeCursor, setTimeCursor] = useState(40)
  const [timelineWidth, setTimelineWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleResize = useCallback(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect()
      setTimelineWidth(width - MEDIA_TYPE_WIDTH)
    }
  }, [ref])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize]);

  const handleChangeRange = useCallback((id: string) => (values: [number, number]) => {
    console.log(id, values)
  } ,[])

  const handleTimeChange = useCallback((value: number) => {
    console.log(value)
    setTimeCursor(value)
  } ,[])

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {files.map(({id, start, end, duration, type}) => (
        <TimelineBar
          key={id}
          parentWidth={timelineWidth}
          time={timeCursor}
          start={start}
          end={end}
          duration={duration}
          mediaType={type}
          onChangeRange={handleChangeRange(id)}
          onPan={handleTimeChange}
        />
      ))}
      <TimeCursor time={timeCursor} duration={200} parentWidth={timelineWidth} onMove={handleTimeChange}/>
    </div>
  )
}