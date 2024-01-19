import {
  MEDIA_TYPE_WIDTH,
} from "@components/video-player/Timeline/constants";

export const getTimeFromTrackPosition = (position: number, duration: number, parentWidth: number, trackWidth: number, includeMargin: boolean = true) => {
  return ((position - (includeMargin ? MEDIA_TYPE_WIDTH : 0) + trackWidth / 2) / parentWidth) * duration
}

export const getPositionFromTime = (time: number, duration: number, parentWidth: number, trackWidth: number, includeMargin: boolean = true) => {
  return (time / duration) * parentWidth + (includeMargin ? MEDIA_TYPE_WIDTH : 0) - trackWidth / 2
}