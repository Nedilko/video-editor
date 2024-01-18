import {
  MEDIA_TYPE_WIDTH,
  TRACK_WIDTH,
} from "@components/video-player/Timeline/constants";

export const getTimeFromTrackPosition = (position: number, duration: number, parentWidth: number) => {
  return ((position - MEDIA_TYPE_WIDTH + TRACK_WIDTH / 2) / parentWidth) * duration
}

export const getPositionFromTime = (time: number, duration: number, parentWidth: number) => {
  return (time / duration) * parentWidth + MEDIA_TYPE_WIDTH - TRACK_WIDTH / 2
}