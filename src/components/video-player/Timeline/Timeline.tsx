import { MediaFileData } from "@/types";
import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { TimeCursor } from "@components/video-player/Timeline/TimeCursor";
import { TimelineBar } from "@components/video-player/Timeline/TimelineBar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner"

type Props = {
  files: MediaFileData[]
}

export const Timeline = ({files}: Props) => {
  const [timeCursor, setTimeCursor] = useState(40)
  const [timelineWidth, setTimelineWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const maxDuration = useMemo(() => files.reduce((acc, {duration}) => Math.max(acc, duration), 0), [files])

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

  const handleRemove = useCallback((id: string, name: string) => () => {
    console.log(id)
    toast.error(`File ${name} removed`, {
      duration: 30000,
      action: {
        label: 'close',
        onClick: () => {}
      }
    })
  } ,[])

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {files.map(({id, name, url, start, end, duration, type}) => (
        <TimelineBar
          key={id}
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
          onPan={handleTimeChange}
          onRemove={handleRemove(id, name)}
        />
      ))}
      <TimeCursor time={timeCursor} duration={maxDuration} parentWidth={timelineWidth} onMove={handleTimeChange}/>
    </div>
  )
}