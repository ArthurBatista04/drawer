import configureStore from "./stores/configureStore.mjs";
import Coordinate from "./components/coordinate.mjs";
import Shapes from "./components/shapes.mjs";
import CanvasBuilder from "./components/canvasBuilder.mjs";
import ListBuilder from "./components/listBuilder.mjs";
import Operation from "./components/operation.mjs";

const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
const canvasBuilder = new CanvasBuilder(store);
const listBuilder = new ListBuilder(store);
const operation = new Operation(store);

shapes.addEvents();
coordinate.addEvents();
canvasBuilder.init();
listBuilder.init();
operation.addEvents();
