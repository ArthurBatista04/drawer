import configureStore from "./stores/configureStore.mjs";
import Coordinate from "./components/coordinate.mjs";
import Shapes from "./components/shapes.mjs";
const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
shapes.addEvents();
coordinate.addEvents();
