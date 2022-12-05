import axios from "axios";
import { userSelectors } from "../state/user";
import { store } from "../state";

axios.defaults.baseURL = "https://rickandmortyapi.com/api";
axios.defaults.headers["Content-Type"] = "application/json";

(axios.interceptors.request.use = async (conf) => {
  const state = store.getState(); //mi ritorna lo stato locale in questo istante

  const token = userSelectors.token(state);

  conf.headers.Authorization = `Bearer ${token}`;

  return conf;
}),
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  };
