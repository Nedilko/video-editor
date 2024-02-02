import { VideoProvideContext } from "@components/video-player/video-provider";
import { useContext } from "react";

export const useVideo = () => {
  const { ffmpeg, loaded, loadProgress, write, convert, trim, mute, getData, addSubtitle, cut } = useContext(VideoProvideContext)

  return {
    ffmpeg,
    loaded,
    loadProgress,
    write,
    convert,
    trim,
    mute,
    getData,
    addSubtitle,
    cut
  }
}