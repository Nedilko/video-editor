import { MediaData, Timeline } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: Timeline = {
  selectedId: '',
  media: [],
  duration: 10,
  removedSubtitles: [],
}
export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    createTimeline: (state, action: PayloadAction<MediaData>) => {
      state.media.push(action.payload)
    },
    updateUrl: (state, action: PayloadAction<{ id: string, value: string }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        mediaCandidate.url = action.payload.value
      }
    },
    removeTimeline: (state, action: PayloadAction<string>) => {
      state.media = state.media.filter(media => media.id !== action.payload)
    },
    setDuration: (state, action: PayloadAction<{ id: string, value: number }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        mediaCandidate.duration = action.payload.value
      }
    },
    setStart: (state, action: PayloadAction<{ id: string, value: number }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        mediaCandidate.start = action.payload.value
      }
    },
    setEnd: (state, action: PayloadAction<{ id: string, value: number }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        mediaCandidate.end = action.payload.value
      }
    },
    setStartEnd: (state, action: PayloadAction<{ id: string, start: number, end: number }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        mediaCandidate.start = action.payload.start
        mediaCandidate.end = action.payload.end
      }
    },
    selectTimeline: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    deselectTimeline: (state) => {
      state.selectedId = ''
    },
    updateTimelineDuration: (state) => {
      state.duration = state.media.reduce((acc, { end }) => Math.max(acc, end), 0)
    },
    toggleMuteSubtitle: (state, action: PayloadAction<{ id: string, subtitleId: string }>) => {
      const mediaCandidate = state.media.find(media => media.id === action.payload.id)
      if (mediaCandidate) {
        const subtitleCandidate = mediaCandidate.subtitles.find(subtitle => subtitle.id === action.payload.subtitleId)
        if (subtitleCandidate) {
          subtitleCandidate.isMuted = !subtitleCandidate.isMuted
        }
      }
    }
  }
});

export const {
  createTimeline,
  removeTimeline,
  setDuration,
  setStart,
  setEnd,
  setStartEnd,
  selectTimeline,
  deselectTimeline,
  updateTimelineDuration,
  updateUrl,
  toggleMuteSubtitle,
} = timelineSlice.actions;

export const getTimeline = (id: string) => (state: RootState) => state.timeline.media.find(timeline => timeline.id === id);
export const getAllTimelines = (state: RootState) => state.timeline.media;

export const getTimelineDuration = (state: RootState) => {
  return state.timeline.duration
}

export const getSelectedTimelineId = (state: RootState) => state.timeline.selectedId;
export const getHasMedia = (state: RootState) => state.timeline.media.length > 0;

export const getMutedSubtitles = (mediaId: string) => (state: RootState) => {
  const media = state.timeline.media.find(media => media.id === mediaId)
  if (media) {
    return media.subtitles.filter(subtitle => subtitle.isMuted)
  }
  return []
}