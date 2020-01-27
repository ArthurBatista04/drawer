import {
  $$,
  ShapeSizes,
  GetRandomID,
  Toast,
  $,
  squarePoints,
  ToastMessage,
  circlePoints
} from "../utils/index.mjs";

import Coordinate from "./coordinate.mjs";
export default class Shapes {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.points = [];
    this.drawing = false;
    this.shape = null;
    this.id = 1;
    this.point = null;
    this.$canvas = document.getElementById("canvas");
    this.$ctx = this.$canvas.getContext("2d");
    this.$buttons = [...$$("a[option=shape]")];
  }
  reset() {
    this.points = [];
    this.drawing = false;
    this.shape = null;
    $(".swal2-popup") ? $(".swal2-popup").click() : null;
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
      $(".swal2-popup") ? $(".swal2-popup").click() : null;
      this.points.push(this.point);
      this.$ctx.fillRect(this.point.x, this.point.y, 3, 3);
      this.isFinished();
    }
  }
  isFinished() {
    if (ShapeSizes[this.shape] == this.points.length) {
      $(".swal2-popup") ? $(".swal2-popup").click() : null;
      this.create();
    } else {
      this.message(ShapeSizes[this.shape] - this.points.length);
    }
  }
  message(rest) {
    let message = rest == 1 ? `Select ${1} point` : `Select ${rest} points`;
    ToastMessage.fire({
      icon: "info",
      title: message
    });
  }
  create() {
    if (this.shape == "SQUARE") {
      this.points = squarePoints(this.points);
    } else if (this.shape == "CIRCLE") {
      this.points = circlePoints(this.points);
    }
    this.store.dispatch({
      type: "CREATE",
      shape: this.shape,
      points: this.points,
      id: this.id
    });
    this.reset();
    this.id++;
  }
  logKey(e) {
    if (e.key === "Escape") {
      this.reset();
    }
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
    document.addEventListener("keydown", this.logKey.bind(this), false);
  }
}
