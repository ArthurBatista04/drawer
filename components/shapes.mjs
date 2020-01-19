import { $$, ShapeSizes, GetRandomID } from "../utils/index.mjs";
import Coordinate from "./coordinate.mjs";
export default class Shapes {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.points = [];
    this.drawing = false;
    this.shape = null;
    this.point = null;
    this.$message = document.getElementById("rest");
    this.$canvas = document.getElementById("canvas");
    this.$ctx = this.$canvas.getContext("2d");
    this.$buttons = [...$$("a[option=shape]")];
  }
  reset() {
    this.points = [];
    this.drawing = false;
    this.shape = null;
    if (this.$message.childNodes[0]) {
      this.$message.removeChild(this.$message.childNodes[0]);
    }
  }
  selectOption({ target }) {
    this.reset();
    this.shape = target.getAttribute("shape");
    this.drawing = true;

    this.message(ShapeSizes[this.shape]);
    target.blur();
  }

  addPoint({ target }) {
    if (this.drawing) {
      this.points.push(this.point);
      this.$ctx.fillRect(this.point.x, this.point.y, 3, 3);
      this.isFinished();
    }
  }
  isFinished() {
    ShapeSizes[this.shape] == this.points.length
      ? this.create()
      : this.message(ShapeSizes[this.shape] - this.points.length);
  }
  message(rest) {
    let message =
      rest == 1
        ? `You still have to select ${1} point`
        : `You still have to select ${rest} points`;
    this.$message.innerHTML = message;
  }
  create() {
    let randomId = GetRandomID();
    this.store.dispatch({
      type: "CREATE",
      shape: this.shape,
      points: this.points,
      id: randomId
    });
    this.reset();
  }

  addEvents() {
    this.$buttons.forEach($btn =>
      $btn.addEventListener("click", this.selectOption.bind(this))
    );
    this.$canvas.addEventListener("click", this.addPoint.bind(this), false);
    this.$canvas.addEventListener(
      "mousedown",
      e => {
        this.point = this.coordinates.getMousePos(this.$canvas, e);
      },
      false
    );
  }
}
