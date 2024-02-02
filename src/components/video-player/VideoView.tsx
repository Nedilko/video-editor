import { Subtitles } from "@components/video-player/Subtitles/Subtitles";
import { VideoViewContainer } from "@components/video-player/VideoViewContainer";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { getAudioSrc, getIsPaused, getIsSeeking, getTime, getVideoSrc, setTime } from "@store/playback-slice";
import { showSubtitles } from "@store/properties-slice";
import { getAllTimelines, getMutedSubtitles } from "@store/timeline-slice";
import { useCallback, useEffect, useRef } from "react";

export const VideoView = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()

  const timeCursor = useAppSelector(getTime)
  const isPaused = useAppSelector(getIsPaused)
  const isShowSubtitles = useAppSelector(showSubtitles)
  const isSeeking = useAppSelector(getIsSeeking)

  const src = useAppSelector(getVideoSrc)
  const audioSrc = useAppSelector(getAudioSrc)

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        (async () => {
          if (videoRef.current) {
            await videoRef.current.play()
          }
        })()
      } else {
        videoRef.current.pause()
      }
    }

    if (audioRef.current) {
      if (isPaused) {
        (async () => {
          if (audioRef.current) {
            await audioRef.current.play()
          }
        })()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPaused]);

  useEffect(() => {
    if (videoRef.current && !isPaused) {
      videoRef.current.currentTime = timeCursor
    }

    if (audioRef.current && !isPaused) {
      audioRef.current.currentTime = timeCursor
    }
  }, [isPaused, isSeeking, timeCursor]);


  const handleUpdateVideoTime = useCallback(() => {
    if (videoRef.current) {
      dispatch(setTime(videoRef.current.currentTime))
    }
  }, [dispatch, timeCursor])

  const timelines = useAppSelector(getAllTimelines)
  const mediaId = timelines.length ? timelines[0].id : ''
  const mutedSubtitles = useAppSelector(getMutedSubtitles(mediaId))


  const isMuted = mutedSubtitles.some((item) => {
    return timeCursor >= item.startSeconds && timeCursor < item.endSeconds
  })

  return (
    <VideoViewContainer>
      <video
        ref={videoRef}
        src={src}
        controls={false}
        autoPlay={false}
        muted={true}
        onTimeUpdate={handleUpdateVideoTime}
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay={false}
        muted={isMuted}
        controls={false}
      />
      {isShowSubtitles && <Subtitles/>}
    </VideoViewContainer>
  )
}