import { MediaFileData } from "@/types";
import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { TimeCursor } from "@components/video-player/Timeline/TimeCursor";
import { TimelineBar } from "@components/video-player/Timeline/TimelineBar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner"

type Props = {
  files: MediaFileData[]
  onRemoveFile: (id: string) => void
}

export const Timeline = ({ files, onRemoveFile }: Props) => {
  const [timeCursor, setTimeCursor] = useState(40)
  const [timelineWidth, setTimelineWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const maxDuration = useMemo(() => files.reduce((acc, { duration }) => Math.max(acc, duration), 0), [files])

  const obs = useMemo(() => new ResizeObserver(() => {
    if (!ref.current) return;
    setTimelineWidth(ref.current.clientWidth - MEDIA_TYPE_WIDTH)

  }), [ref])

  useEffect(() => {
    if (!ref.current) return;
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [obs]);

  const handleChangeRange = useCallback((id: string) => (values: [number, number]) => {
    console.log(id, values)
  }, [])

  const handleTimeChange = useCallback((value: number) => {
    console.log(value)
    setTimeCursor(value)
  }, [])

  const handleRemove = useCallback((id: string, name: string) => () => {
    onRemoveFile(id)
    toast.error(`File ${name} removed`, {
      duration: 300000,
      action: {
        label: 'close',
        onClick: () => {
        }
      },
    })
  }, [onRemoveFile])

  if (!files.length) {
    return <div className="flex flex-col items-center justify-center h-full">
      <div data-abc={true} className="text-muted-foreground">No files</div>
      <div className="text-muted-foreground">Add some files to start editing</div>
    </div>
  }

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {files.map(({ id, name, url, start, end, duration, type }) => (
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
