export enum MediaType {
  Audio = 'audio',
  Video = 'video',
}

export type Subtitle = {
  id: string
  text: string
  startSeconds:number
  endSeconds: number
  startTime: string
  endTime: string
  isMuted: boolean
}

export type MediaData = {
  id: string
  type: MediaType,
  name: string,
  url: string,
  start: number,
  end: number,
  duration: number
  subtitles: Subtitle[]
}

export enum LogoPosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export type Properties = {
  subtitles: boolean
  intro: boolean
  outro: boolean
  logo: boolean
  logoPosition: string | undefined
}

export type Playback = {
  playing: boolean
  isSeeking: boolean
  time: number
  start: number
  end: number
  src: string
  audioSrc: string
}

export type Timeline = {
  selectedId: string
  media: MediaData[]
  duration: number
  removedSubtitles: Subtitle[]
}