import {
  $$,
  $,
  Toast,
  getMinVerticeDistance,
  ToastMessage
} from "../utils/index.mjs";
import { getSelectedShapes } from "../stores/connect.mjs";
import Coordinate from "./coordinate.mjs";
export default class Operations {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.point = null;
    this.points = [];
    this.isTransformation = false;
    this.operation = null;
    this.$canvas = document.getElementById("canvas");
    this.$undo = $("a[option = undo]");
    this.$redo = $("a[option = redo]");
    this.$clear = $("a[option = clear]");
    this.$transformations = [...$$("a[option=transformation]")];
  }

  undo() {
    this.store.dispatch({ type: "UNDO" });
  }
  redo() {
    this.store.dispatch({ type: "REDO" });
  }
  clear() {
    this.store.dispatch({ type: "CLEAR" });
  }
  transformations = {
    TRANSLATE: this.translate.bind(this),
    ROTATE: this.rotate,
    SCALE: this.scale
  };
  rotate() {}
  scale() {}
  getExtremePoint(shapes) {
    const translationPoint = this.points.pop();
    const referencePoint = this.points.pop();
    const extremePoint = getMinVerticeDistance(shapes, referencePoint);
    const dx = translationPoint.x - extremePoint.x;
    const dy = translationPoint.y - extremePoint.y;
    for (const [id, value] of Object.entries(shapes)) {
      let newPoints = value.points.map(point => {
        return { x: point.x + dx, y: point.y + dy };
      });
      this.store.dispatch({ type: "UPDATE", points: newPoints, id: id });
    }
  }
  translate() {
    if (this.points.length == 2) {
      const selectedShapes = getSelectedShapes(this.store, "Shapes");
      this.getExtremePoint(selectedShapes);
      this.points = [];
      this.isTransformation = false;
      $(".swal2-popup") ? $(".swal2-popup").click() : null;
    } else {
      ToastMessage.fire({
        icon: "info",
        title:
          this.points.length == 0
            ? `Select a reference point (must be a shape vertice)`
            : `Select a point to translate to`
      });
    }
  }
  selectTransformation({ target }) {
    const selectedShapes = getSelectedShapes(this.store, "Shapes");
    if (!jQuery.isEmptyObject(selectedShapes)) {
      this.isTransformation = true;
      const transformation = target.getAttribute("transformation");
      this.operation = transformation;
      let operation = this.transformations[transformation];
      operation(selectedShapes);
    } else {
      Toast.fire({
        icon: "info",
        title: "Select at least one shape to continue"
      });
    }
  }
  addEvents() {
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
    this.$clear.addEventListener("click", this.clear.bind(this), false);
    this.$transformations.forEach($btn =>
      $btn.addEventListener("click", this.selectTransformation.bind(this))
    );
    this.$canvas.addEventListener(
      "mousedown",
      e => {
        this.point = this.coordinates.getMousePos(this.$canvas, e);
      },
      false
    );
    this.$canvas.addEventListener(
      "click",
      () => {
        if (this.isTransformation) {
          this.points.push(this.point);
          this.transformations[this.operation]();
        }
      },
      false
    );
  }
}
