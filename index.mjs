import configureStore from "./stores/configureStore.mjs";
import Coordinate from "./components/coordinate.mjs";
const store = configureStore();
const coordinate = new Coordinate(store);
coordinate.addEvents();
