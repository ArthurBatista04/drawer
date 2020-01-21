import {
  $$,
  $,
  Toast,
  multiply,
  getMinVerticeDistance,
  ToastMessage,
  getAngle,
  getScales,
  TransformationSize
} from "../utils/index.mjs";
import { getSelectedShapes } from "../stores/connect.mjs";
import Coordinate from "./coordinate.mjs";
export default class Transformations {
  constructor(store) {
    this.store = store;
    this.coordinates = new Coordinate();
    this.point = null;
    this.points = [];
    this.isTransformation = false;
    this.operation = null;
    this.$canvas = document.getElementById("canvas");
    this.$transformations = [...$$("a[option=transformation]")];
  }

  reset() {
    this.points = [];
    this.isTransformation = false;
    $(".swal2-popup") ? $(".swal2-popup").click() : null;
  }

  rotate(angle, point) {
    const shapes = getSelectedShapes(this.store, "Shapes");
    const radian = -(angle * (Math.PI / 180));

    const line1 = [
      Math.cos(radian),
      -Math.sin(radian),
      point.y * Math.sin(radian) - point.x * Math.cos(radian) + point.x
    ];
    const line2 = [
      Math.sin(radian),
      Math.cos(radian),
      -point.x * Math.sin(radian) - point.y * Math.cos(radian) + point.y
    ];
    const line3 = [0, 0, 1];
    for (const [id, value] of Object.entries(shapes)) {
      let matrixPoints = [[], [], []];
      for (const point of value.points) {
        matrixPoints[0].push(point.x);
        matrixPoints[1].push(point.y);
        matrixPoints[2].push(1);
      }
      const result = multiply([line1, line2, line3], matrixPoints);
      let newPoints = [];
      for (let i = 0; i < value.points.length; i++) {
        newPoints.push({ x: result[0][i] });
      }
      for (let i = 0; i < value.points.length; i++) {
        newPoints[i]["y"] = result[1][i];
      }
      this.store.dispatch({ type: "UPDATE", points: newPoints, id: id });
    }
  }

  scale(scales) {
    const shapes = getSelectedShapes(this.store, "Shapes");

    for (const [id, value] of Object.entries(shapes)) {
      const first = value.points[0];
      const line1 = [scales.x, 0, first.x - first.x * scales.x];
      const line2 = [0, scales.y, first.y - first.y * scales.y];
      const line3 = [0, 0, 1];
      let matrixPoints = [[], [], []];
      for (const point of value.points) {
        matrixPoints[0].push(point.x);
        matrixPoints[1].push(point.y);
        matrixPoints[2].push(1);
      }
      const result = multiply([line1, line2, line3], matrixPoints);
      let newPoints = [];
      for (let i = 0; i < value.points.length; i++) {
        newPoints.push({ x: result[0][i] });
      }
      for (let i = 0; i < value.points.length; i++) {
        newPoints[i]["y"] = result[1][i];
      }

      this.store.dispatch({ type: "UPDATE", points: newPoints, id: id });
    }
  }
  translate(translationPoint, referencePoint) {
    const shapes = getSelectedShapes(this.store, "Shapes");
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
  message(message) {
    ToastMessage.fire({
      icon: "info",
      title: message
    });
  }

  selectTransformation({ target }) {
    const selectedShapes = getSelectedShapes(this.store, "Shapes");
    if (!jQuery.isEmptyObject(selectedShapes)) {
      this.isTransformation = true;
      const transformation = target.getAttribute("transformation");
      this.operation = transformation;
      this.isFinished();
    } else {
      Toast.fire({
        icon: "info",
        title: "Select at least one shape to continue"
      });
    }
  }
  async isFinished() {
    if (this.operation == "TRANSLATE" || this.operation == "ROTATE")
      if (this.points.length === TransformationSize[this.operation]) {
        if (this.operation == "TRANSLATE") {
          const translationPoint = this.points.pop();
          const referencePoint = this.points.pop();
          this.translate(translationPoint, referencePoint);
        } else if (this.operation == "ROTATE") {
          const referencePoint = this.points.pop();
          const angle = await getAngle();
          this.rotate(angle, referencePoint);
        }
        this.reset();
      } else {
        let message;
        if (this.operation == "TRANSLATE") {
          message =
            this.points.length == 0
              ? " Select a shape vertice"
              : "Select a point to translate to";
        } else {
          message = `Select a reference point `;
        }
        this.message(message);
      }
    else {
      const scales = await getScales();
      this.scale(scales);
    }
  }
  addPoint() {
    if (this.isTransformation) {
      this.points.push(this.point);
      this.isFinished();
    }
  }
  logKey(e) {
    if (e.code == "Space") {
      this.reset();
    }
  }

  addEvents() {
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
    this.$canvas.addEventListener("click", this.addPoint.bind(this), false);
    document.addEventListener("keypress", this.logKey.bind(this), false);
  }
}
