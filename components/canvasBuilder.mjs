import { getPresentState } from "../stores/connect.mjs";
export default class CanvasBuilder {
  constructor(store) {
    this.store = store;
    this.$canvas = document.getElementById("canvas");
    this.$ctx = this.$canvas.getContext("2d");
  }

  create_line = object => {
    const point1 = object.points[0];
    const point2 = object.points[1];
    this.$ctx.beginPath();
    this.$ctx.moveTo(point1.x, point1.y);
    this.$ctx.lineTo(point2.x, point2.y);
    object.selected
      ? (this.$ctx.strokeStyle = "#ff0000")
      : (this.$ctx.strokeStyle = "#000000");
    this.$ctx.stroke();
  };
  create_circle = object => {
    const point1 = object.points[0];
    const point2 = object.points[1];
    const difX = Math.pow(point1.x - point2.x, 2);
    const difY = Math.pow(point1.y - point2.y, 2);
    const radius = Math.sqrt(difX + difY);
    this.$ctx.beginPath();
    this.$ctx.arc(point1.x, point1.y, radius, 0, 2 * Math.PI), true;
    object.selected
      ? (this.$ctx.strokeStyle = "#ff0000")
      : (this.$ctx.strokeStyle = "#000000");
    this.$ctx.stroke();
  };
  create_triangle = object => {
    const point1 = object.points[0];
    const point2 = object.points[1];
    const point3 = object.points[2];
    this.$ctx.beginPath();
    this.$ctx.moveTo(point1.x, point1.y);
    this.$ctx.lineTo(point2.x, point2.y);
    this.$ctx.lineTo(point3.x, point3.y);
    this.$ctx.closePath();
    object.selected
      ? (this.$ctx.strokeStyle = "#ff0000")
      : (this.$ctx.strokeStyle = "#000000");
    this.$ctx.stroke();
  };
  create_square = object => {
    const point1 = object.points[0];
    const point2 = object.points[1];
    const difX = Math.pow(point1.x - point2.x, 2);
    const difY = Math.pow(point1.y - point2.y, 2);
    const width = Math.sqrt(difX + difY);
    object.selected
      ? (this.$ctx.strokeStyle = "#ff0000")
      : (this.$ctx.strokeStyle = "#000000");
    this.$ctx.strokeRect(point1.x, point1.y, width, width);
  };
  shapeCriation = {
    LINE: this.create_line,
    CIRCLE: this.create_circle,
    TRIANGLE: this.create_triangle,
    SQUARE: this.create_square
  };

  updateCanvas() {
    this.$ctx.clearRect(0, 0, 1300, 820);
    const objects = getPresentState(this.store, "Shapes");
    if (objects) {
      for (const [_, value] of Object.entries(objects)) {
        const criator = this.shapeCriation[value.shape];
        criator(value);
      }
    }
  }

  init() {
    this.store.subscribe(this.updateCanvas.bind(this));
  }
}
