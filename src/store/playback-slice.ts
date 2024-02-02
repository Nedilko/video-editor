import { Playback } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: Playback = {
  playing: false,
  time: 0,
  start: 0,
  end: 10,
  src: '',
  audioSrc: '',
  isSeeking: false,
}
export const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    play: (state) => {
      state.playing = true
    },
    pause: (state) => {
      state.playing = false
    },
    togglePlayPause: (state) => {
      state.playing = !state.playing
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload
    },
    setTimeAndPause: (state, action: PayloadAction<number>) => {
      state.playing = false
      state.time = action.payload
    },
    setVideoSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload
    },
    setAudioSrc: (state, action: PayloadAction<string>) => {
      state.audioSrc = action.payload
    },
    setStart: (state, action: PayloadAction<number>) => {
      state.start = action.payload
    },
    setEnd: (state, action: PayloadAction<number>) => {
      state.end = action.payload
    },
    goToStart: (state) => {
      state.time = state.start
    },
    goToEnd: (state) => {
      state.time = state.end
    },
    setIsSeeking: (state, action: PayloadAction<boolean>) => {
      state.isSeeking = action.payload
    }
  }
});

export const {
  play,
  pause,
  togglePlayPause,
  setTime,
  setTimeAndPause,
  setVideoSrc,
  setAudioSrc,
  setStart,
  setEnd,
  goToStart,
  goToEnd,
  setIsSeeking,
} = playbackSlice.actions;

export const getIsPaused = (state: RootState) => state.playback.playing;
export const getTime = (state: RootState) => state.playback.time;
export const getVideoSrc = (state: RootState) => state.playback.src;
export const getAudioSrc = (state: RootState) => state.playback.audioSrc;
export const getStart = (state: RootState) => state.playback.start;
export const getEnd = (state: RootState) => state.playback.end;
export const getIsSeeking = (state: RootState) => state.playback.isSeeking;
