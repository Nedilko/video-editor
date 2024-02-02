import { Container } from "@components/video-player/Subtitles/Container";
import { useAppSelector } from "@hooks/store";
import { getTime } from "@store/playback-slice";
import { getAllTimelines } from "@store/timeline-slice";

export const Subtitles = () => {
  const timeCursor = useAppSelector(getTime)
  const timelines = useAppSelector(getAllTimelines)

  if (!timelines.length) {
    return null
  }

  const subtitles = timelines[0].subtitles

  const text = subtitles.find(({
                                 startSeconds,
                                 endSeconds, isMuted
                               }) => timeCursor >= startSeconds && timeCursor <= endSeconds && !isMuted  )?.text

  if (!text) {
    return null
  }

  return (
    <Container>{text}</Container>
  )
}