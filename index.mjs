import configureStore from "./stores/configureStore.mjs";
import Coordinate from "./components/coordinate.mjs";
import Shapes from "./components/shapes.mjs";
import CanvasBuilder from "./components/canvasBuilder.mjs";

const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
const canvasBuilder = new CanvasBuilder(store);
// const listBuilder = new listBuilder(store);
shapes.addEvents();
coordinate.addEvents();
canvasBuilder.init();
