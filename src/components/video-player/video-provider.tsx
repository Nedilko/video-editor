import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { createContext, ReactNode, useEffect, useState } from "react";

const FFMPEG_BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'

type VideoProviderState = {
  ffmpeg: FFmpeg
  loaded: boolean
  loadProgress: number
  write: (url: string, name: string) => Promise<void>
  convert: (inputName: string, outName: string) => Promise<void>
  trim: (inputName: string, outName: string, start: number, end: number) => Promise<void>
  mute: (name: string, start: number, end: number) => Promise<void>
  getData: (outName: string) =>  Promise<Uint8Array | string>
  addSubtitle: (inputName: string, outName: string) => Promise<void>
  cut: (inputName: string, outName: string, start: number, duration: number) => Promise<void>
}

const initialState = {
  ffmpeg: new FFmpeg(),
  loaded: false,
  loadProgress: 0,
  write: async () => {},
  convert: async () => {},
  trim: async () => {},
  mute: async () => {},
  getData: async () => new Uint8Array(),
  addSubtitle: async () => {},
  cut: async () => {},
}

export const VideoProvideContext = createContext<VideoProviderState>(initialState)

type Props = {
  children: ReactNode
}

const ffmpeg = new FFmpeg();

export const VideoProvider = ({ children }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const writeMediaFile = async (url: string, name: string,) => {
    await ffmpeg.writeFile(name, await fetchFile(url));
  }

  // const convertMedia = async (inputName: string, outName: string) => {
  //   await ffmpeg.exec(['-i', inputName, '-c', 'copy', outName]);
  //   // await ffmpeg.exec(['-i', inputName, '-vf', 'fps=24', outName]);
  // }

  // const convertMedia = async (inputName: string, outName: string) => {
  //   // await ffmpeg.exec(['-i', inputName, '-c', 'copy', 'audio.m4a']);
  //   // await ffmpeg.exec(['-i', inputName, '-an', '-c', 'copy', outName]);
  //   // await ffmpeg.exec(['-i', inputName, '-map', '0:a:1', '-c', 'copy', 'audio.m4a']);
  //   await ffmpeg.exec(['-i', inputName, '-c', 'copy', 'audio.m4a']);
  //   await ffmpeg.exec(['-i', inputName, '-an', '-c', 'copy', outName]);
  //   // await ffmpeg.exec(['-i', inputName, '-map', '0:a:1', '-c', 'copy', 'audio.m4a']);
  // }

  const convertMedia = async (inputName: string, outName: string) => {
    await ffmpeg.exec(['-i', inputName, '-map', '0:a', '-c', 'copy', 'audio.m4a']);
    await ffmpeg.exec(['-i', inputName, '-an', '-c', 'copy', outName]);
  }

  const trimVideo = async (inputName: string, outName: string, start: number, end: number) => {
    await ffmpeg.exec(['-i', inputName, '-ss', `${start}`, '-to', `${end}`, '-c', 'copy', outName]);
  }

  const muteAudio = async (name: string, start: number, end: number) => {
    await ffmpeg.exec(['-i', name, '-c', 'copy', 'audio_c.m4a']);
    await ffmpeg.exec(['-i', 'audio_c.m4a', "-af", `volume=enable='between(t,${start},${end})':volume=0`, name]);
    // await ffmpeg.exec(['-i', 'audio_c.m4a', "-af", `volume=enable='between(t,${1},${5})':volume=0`, name]);
  }

  const cutVideo = async (inputName: string, outName: string, start: number, duration: number) => {
    await ffmpeg.exec(['-i', inputName, '-t', `${start}` , '-c', 'copy', 'part1.mp4']);
    await ffmpeg.exec(['-i', inputName, '-ss', `${start + duration}` , '-c', 'copy', 'part2.mp4']);
    await ffmpeg.exec(['-i', 'part1.mp4', '-i', 'part2.mp4', '-filter_complex', '[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[outv][outa]', '-map', '[outv]', '-map', '[outa]', outName]);
  }

  const getMediaData = async (outName: string) => {
    return await ffmpeg.readFile(outName);
  }

  const addSubtitle = async (inputName: string, outName: string) => {
    await ffmpeg.exec(['-i', inputName, '-vf', `subtitles=subtitle.srt`, outName]);
  }

  const value = {
    ffmpeg,
    loaded,
    loadProgress,
    write: writeMediaFile,
    convert: convertMedia,
    trim: trimVideo,
    mute: muteAudio,
    getData: getMediaData,
    addSubtitle,
    cut: cutVideo
  }

  const load = async () => {
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });
    ffmpeg.on('progress', ({ progress }) => {
      setLoadProgress(progress * 100)
      console.log('progress', progress)
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
  }

  useEffect(() => {
    (async () => {
      await load()
    })()
  }, []);

  return (
    <VideoProvideContext.Provider value={value}>
      {children}
    </VideoProvideContext.Provider>
  )
}
