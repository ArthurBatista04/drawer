import configureStore from "./stores/configureStore.mjs";
import {
	Coordinate,
	CanvasBuilder,
	Extras,
	ListBuilder,
	Shapes,
	Transformations,
	Zoom
} from "./components/index.mjs";

const store = configureStore();
const coordinate = new Coordinate();
const shapes = new Shapes(store);
const canvasBuilder = new CanvasBuilder(store);
const listBuilder = new ListBuilder(store);
const extras = new Extras(store);
const transformations = new Transformations(store);
const zoom = new Zoom(store);
shapes.addEvents();
coordinate.addEvents();
extras.addEvents();
transformations.addEvents();
zoom.addEvents();
canvasBuilder.init();
listBuilder.init();

function create_line(x, y, x2, y2) {
	const point1 = {x: x, y: y};
	const point2 = {x: x2, y: y2};
	shapes.shape = "LINE";
	shapes.points = [point1, point2];
	shapes.create();
}

function create_triangle(x, y, x2, y2, x3, y3) {
	const point1 = {x: x, y: y};
	const point2 = {x: x2, y: y2};
	const point3 = {x: x3, y: y3};
	shapes.shape = "TRIANGLE";
	shapes.points = [point1, point2, point3];
	shapes.create();
}

function create_square(x, y, x2, y2) {
	const point1 = {x: x, y: y};
	const point2 = {x: x2, y: y2};
	shapes.shape = "SQUARE";
	shapes.points = [point1, point2];
	shapes.create();
}

function create_circle(x, y, x2, y2) {
	const point1 = {x: x, y: y};
	const point2 = {x: x2, y: y2};
	shapes.shape = "CIRCLE";
	shapes.points = [point1, point2];
	shapes.create();
}

function select_shape(id) {
	listBuilder.select(id.toString());
}

function delete_shape(id) {
	listBuilder.delete(id.toString());
}
function translate(x1, y1, x2, y2) {
	const point1 = {x: x1, y: y1};
	const point2 = {x: x2, y: y2};
	transformations.translate(point2, point1);
}

function rotate(x, y, angle) {
	const point1 = {x: x, y: y};
	transformations.rotate(angle, point1);
}

function scale(x, y) {
	const scales = {x: x, y: y};
	transformations.scale(scales);
}

function zoomIn(x1, y1, x2, y2) {
	const point1 = {x: x1, y: y1};
	const point2 = {x: x2, y: y2};

	zoom.zoom([point1, point2]);
}

window.create_line = create_line;
window.create_triangle = create_triangle;
window.create_square = create_square;
window.create_circle = create_circle;
window.select_shape = select_shape;
window.delete_shape = delete_shape;
window.translate = translate;
window.rotate = rotate;
window.scale = scale;
window.zoom_in = zoomIn;
