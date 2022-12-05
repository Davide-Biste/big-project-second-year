import axios from "axios";
import {
  rickMortySelectors,
  rickMortySlice,
  setCharacters,
  setCharactersByLocation,
} from "../state/rickMorty";
import { store } from "../state";

export const getCharacters = async (search, statusRadio, page) => {
  try {
    const status = statusRadio === "All" ? undefined : statusRadio;

    const params = {
      name: search,
      status: status,
      page: page,
    };
    const { data: character } = await axios.get(`/character`, { params });
    if (!page || page === 1) {
      store.dispatch(setCharacters(character.results));
    } else {
      const state = store.getState();
      const localList = rickMortySelectors.characters(state);
      store.dispatch(setCharacters([...localList, ...character.results]));
    }
    return 200;
  } catch (e) {
    console.log(e);
    store.dispatch(setCharacters([]));
    console.log({ erorGetCharacter: e });
    return e.response.status;
  }
};

export const getLocation = async (id) => {
  try {
    const { data: location } = await axios.get(`/location/${id}`);
    return location;
  } catch (e) {
    console.log({ errorGetLocation: e });
    return e.response.status;
  }
};

export const getSingleCharacter = async (id) => {
  try {
    const { data: singleCharachter } = await axios.get(`/character/${id}`);
    return singleCharachter;
  } catch (e) {
    console.log({ errorGetLocation: e });
    return e.response.status;
  }
};
