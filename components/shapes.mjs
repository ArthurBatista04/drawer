import {
  $$,
  ShapeSizes,
  GetRandomID,
  Toast,
  $,
  ToastMessage
} from "../utils/index.mjs";

import Coordinate from "./coordinate.mjs";
export default class Shapes {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.points = [];
    this.drawing = false;
    this.shape = null;
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
    let randomId = GetRandomID();
    this.store.dispatch({
      type: "CREATE",
      shape: this.shape,
      points: this.points,
      id: randomId
    });
    this.reset();
  }
  logKey(e) {
    if (e.code == "Space") {
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
    document.addEventListener("keypress", this.logKey.bind(this), false);
  }
}
