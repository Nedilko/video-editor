import {
  Action,
  ThunkAction,
  configureStore,
  combineSlices,
} from '@reduxjs/toolkit';
import { playbackSlice } from "@store/playback-slice";
import { propertiesSlice } from "@store/properties-slice";
import { timelineSlice } from "@store/timeline-slice";

export const rootReducer = combineSlices(
  propertiesSlice,
  playbackSlice,
  timelineSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
