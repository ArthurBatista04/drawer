import configureStore from "./stores/configureStore.mjs";
import Coordinate from "./components/coordinate.mjs";
import Shapes from "./components/shapes.mjs";
const store = configureStore();
const coordinate = new Coordinate(store);
const shapes = new Shapes();
shapes.addEvents();
coordinate.addEvents();
