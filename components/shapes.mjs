import { $$ } from "../utils/index.mjs";
import Coordinate from "./coordinate.mjs";
import { ShapeSizes } from "../utils/shapeSizes.mjs";
export default class Shapes {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.points = [];
    this.drawing = false;
    this.shape = null;
    this.$message = $$("div[id=rest]");
    this.$canvas = document.getElementById("canvas");
    this.$buttons = [...$$("a[option=shape]")];
  }
  reset() {
    this.points = [];
    this.drawing = false;
    this.shape = null;
    this.$message.removeChild(this.$div.childNodes[0]);
  }
  onClick({ target }) {
    this.shape = target.getAttribute("shape");
    this.drawing = true;
    target.blur();
  }

  addPoint({ target }) {
    let point = this.coordinates.getMousePos(this.$canvas, target);
    if (this.drawing) {
      this.points.push(point);
      this.verify();
    }
  }
  verify() {
    shapeSizes[this.shape] == this.points.length
      ? this.create()
      : message(ShapeSizes[this.shape] - this.points.length);
  }
  message(rest) {
    let message =
      rest == 1
        ? `You still have to select ${1} point`
        : `You still have to select ${rest} points`;
    this.$message.innerHTML(message);
  }
  create() {
    this.store.dispatch({
      type: "CREATE",
      shape: this.shape,
      points: this.points
    });
    console.log(this.store.getState());
    this.reset();
  }

  addEvents() {
    this.$buttons.forEach($btn =>
      $btn.addEventListener("click", this.onClick.bind(this))
    );
    this.$canvas.addEventListener("click", this.addPoint.bind(this), false);
  }
  init() {
    this.store.subscribe(updateDom(this));
  }
}
