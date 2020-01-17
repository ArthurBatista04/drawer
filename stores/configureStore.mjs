import Reducers from "../reducers/index.mjs";

export default function configureStore() {
  return Redux.createStore(Reducers);
}
