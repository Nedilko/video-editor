import { LogoPosition, Properties } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: Properties = {
  subtitles: true,
  intro: false,
  outro: false,
  logo: false,
  logoPosition: LogoPosition.TopLeft
}
export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    toggleSubtitles: (state) => {
      state.subtitles = !state.subtitles
    },
    toggleIntro: (state) => {
      state.intro = !state.intro
    },
    toggleOutro: (state) => {
      state.outro = !state.outro
    },
    toggleLogo: (state) => {
      state.logo = !state.logo
    },
    setLogoPosition: (state, action: PayloadAction<string>) => {
      state.logoPosition = action.payload
    },
  }
});

export const {
  toggleSubtitles,
  toggleIntro,
  toggleOutro,
  toggleLogo,
  setLogoPosition
} = propertiesSlice.actions;

export const showSubtitles = (state: RootState) => state.properties.subtitles;
export const showIntro = (state: RootState) => state.properties.intro;
export const showOutro = (state: RootState) => state.properties.outro;
export const addLogo = (state: RootState) => state.properties.logo;
export const getLogoPosition = (state: RootState) => state.properties.logoPosition;