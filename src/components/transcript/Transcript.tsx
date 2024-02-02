import { Search } from "@components/transcript/Search";
import { TranscriptItem } from "@components/transcript/TranscriptItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { useAppSelector } from "@hooks/store";
import { getIsSeeking, getTime } from "@store/playback-slice";
import { getAllTimelines } from "@store/timeline-slice";
import { useEffect, useMemo, useRef, useState } from "react";

export const Transcript = () => {
  const ref = useRef<HTMLDivElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const timelines = useAppSelector(getAllTimelines)
  const timeCursor = useAppSelector(getTime)
  const isSeeking = useAppSelector(getIsSeeking)

  const [searchText, setSearchText] = useState('')

  let activeId = ''

  if (timelines.length && !isSeeking) {
    const subtitles = timelines[0].subtitles
    activeId = subtitles.find(({
                                 startSeconds,
                                 endSeconds
                               }) => timeCursor >= startSeconds && timeCursor < endSeconds)?.id || ''
  }

  useEffect(() => {
    if (transcriptRef.current && activeId && !isSeeking) {
      transcriptRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }, [activeId]);

  const mediaId = timelines.length ? timelines[0].id : ''

  const subtitles = useMemo(() => {
    if (!timelines.length) {
      return []
    }

    const currentTimeline = timelines[0]

    return currentTimeline.subtitles.filter((item) => {
      const containsSearchText = item.text.toLowerCase().includes(searchText.toLowerCase())
      const isInRange = item.startSeconds >= currentTimeline.start && item.endSeconds <= currentTimeline.end

      return containsSearchText && isInRange
    })
  }, [searchText, timelines])

  if (!timelines.length) {
    return null
  }

  return <div>
    <Search onChange={(value) => setSearchText(value)}/>
    <ScrollArea className="h-[calc(100vh-180px)] mt-4" ref={ref}>
      <div className="flex flex-col gap-4">
        {subtitles.length ? subtitles.map(({ id, startSeconds, text, endSeconds, isMuted }) => (
          <TranscriptItem
            mediaId={mediaId}
            id={id}
            searchText={searchText}
            ref={id === activeId ? transcriptRef : null}
            active={id === activeId}
            key={id}
            firstname="Katie"
            lastname="Rowe"
            start={startSeconds}
            end={endSeconds}
            text={text}
            isMuted={isMuted}
          />
        )) : (
          <div className="text-muted-foreground mx-auto">No search results</div>
        )}
      </div>
      <ScrollBar/>
    </ScrollArea>
  </div>
}