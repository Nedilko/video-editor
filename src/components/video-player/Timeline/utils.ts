import { Subtitle } from "@/types";
import {
  MEDIA_TYPE_WIDTH,
} from "@components/video-player/Timeline/constants";
import srtParser2 from "srt-parser-2";

const parser = new srtParser2();

export const getTimeFromTrackPosition = (position: number, duration: number, parentWidth: number, trackWidth: number, includeMargin: boolean = true) => {
  return ((position - (includeMargin ? MEDIA_TYPE_WIDTH : 0) + trackWidth / 2) / parentWidth) * duration
}

export const getPositionFromTime = (time: number, duration: number, parentWidth: number, trackWidth: number, includeMargin: boolean = true) => {
  return (time / duration) * parentWidth + (includeMargin ? MEDIA_TYPE_WIDTH : 0) - trackWidth / 2
}

export const loadMediaMetadata = async (file: File): Promise<{
  duration: number
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const media = new Audio(event.target?.result as string);
      media.onloadedmetadata = async () => {
        resolve({
          duration: media.duration,
        })
      };
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export const loadSubtitlesMetadata = async (file: File): Promise<{
  subtitles: Subtitle[],
  url: string
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const subtitles = parser.fromSrt(event.target?.result as string);
      resolve({
        subtitles: subtitles.map(subtitle => ({ ...subtitle, isMuted: false })),
        url: URL.createObjectURL(file)
      });
    };
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

export const getMediaOutName = (id: string) => {
  return `${id}.mp4`
}

export const getVideoUrl = (data: Uint8Array | string) => URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))
