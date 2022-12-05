import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  characters: [],
  charactersByLocation: [],
  search: "",
  radio: "check",
};

export const rickMortySlice = createSlice({
  name: "rickMorty",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setCharactersByLocation: (state, action) => {
      state.charactersByLocation = action.payload;
    },
    setSearchRM: (state, action) => {
      state.search = action.payload;
    },
    setRadioRM: (state, action) => {
      state.radio = action.payload;
    },
  },
});

export const {
  setCharacters,
  setSearchRM,
  setRadioRM,
  setCharactersByLocation,
} = rickMortySlice.actions;

export default rickMortySlice.reducer;

export const rickMortySelectors = {
  characters: (state) => _.get(state, "rickMorty.characters", []),
  charactersByLocation: (state) =>
    _.get(state, "rickMorty.charactersByLocation", []),
  search: (state) => _.get(state, "rickMorty.search", []),
  radio: (state) => _.get(state, "rickMorty.radio", []),
};
