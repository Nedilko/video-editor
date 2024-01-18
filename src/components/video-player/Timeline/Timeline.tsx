// import { MediaTimeline } from "@components/video-player/Timeline/MediaTimeline";
import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { TimeCursor } from "@components/video-player/Timeline/TimeCursor";
import { TimelineBar } from "@components/video-player/Timeline/TimelineBar";
import { useCallback, useEffect, useRef, useState } from "react";

export const Timeline = () => {
  const [timeCursor, setTimeCursor] = useState(0)
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

  const handleChangeRange = useCallback((values: [number, number]) => {
    console.log(values)
  } ,[])

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {/*<MediaTimeline mediaType="video" startTime={20} time={timeCursor} endTime={60}*/}
      {/*               onChange={([, center]) => setTimeCursor(center)}/>*/}
      {/*<MediaTimeline mediaType="audio" startTime={25} time={timeCursor} endTime={55}*/}
      {/*               onChange={([, center]) => setTimeCursor(center)}/>*/}
      <TimelineBar
        parentWidth={timelineWidth}
        time={timeCursor}
        start={30}
        end={150}
        duration={200}
        mediaType="video"
        onChangeRange={handleChangeRange}
        onPan={(value) => setTimeCursor(value)}
      />
      <TimelineBar
        parentWidth={timelineWidth}
        time={timeCursor}
        start={50}
        end={130}
        duration={200}
        mediaType="audio"
        onChangeRange={handleChangeRange}
        onPan={(value) => setTimeCursor(value)}
      />


      <TimeCursor time={timeCursor} duration={200} parentWidth={timelineWidth} onMove={(value) => setTimeCursor(value)}/>
    </div>
  )
}