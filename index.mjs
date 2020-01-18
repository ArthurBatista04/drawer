import configureStore from "./stores/configureStore.mjs";
import {
  Coordinate,
  CanvasBuilder,
  Operations,
  ListBuilder,
  Shapes
} from "./components/index.mjs";

const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
const canvasBuilder = new CanvasBuilder(store);
const listBuilder = new ListBuilder(store);
const operation = new Operations(store);

shapes.addEvents();
coordinate.addEvents();
operation.addEvents();
canvasBuilder.init();
listBuilder.init();
