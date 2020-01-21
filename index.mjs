import configureStore from "./stores/configureStore.mjs";
import {
  Coordinate,
  CanvasBuilder,
  Extras,
  ListBuilder,
  Shapes,
  Transformations
} from "./components/index.mjs";

const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
const canvasBuilder = new CanvasBuilder(store);
const listBuilder = new ListBuilder(store);
const extras = new Extras(store);
const transformations = new Transformations(store);

shapes.addEvents();
coordinate.addEvents();
extras.addEvents();
transformations.addEvents();
canvasBuilder.init();
listBuilder.init();
