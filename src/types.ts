export enum MediaType {
  Audio = 'audio',
  Video = 'video',
}

export type MediaFileData = {
  id: string
  name: string
  type: MediaType
  start: number,
  end: number,
  duration: number
  url: string
}