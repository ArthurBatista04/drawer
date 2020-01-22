import { getExtremePoints, getPresentState } from "../stores/connect.mjs";
import { multiply } from "../utils/index.mjs";
export default class Zoom {
  constructor(store) {
    this.store = store;
    this.$zoom = document.getElementById("zoom");
    this.$zoomExtend = document.getElementById("zoomExtend");
  }

  zoomExtend() {
    const shapes = getPresentState(this.store);
    const points = getExtremePoints(this.store);

    const x = { min: points[2], max: points[3] };
    const y = { min: points[0], max: points[1] };
    const u = { min: 0, max: 1300 };
    const v = { min: 0, max: 820 };
    const sx = (u.max - u.min) / (x.max - x.min);
    const sy = (v.max - v.min) / (y.max - y.min);
    const rw = (x.max - x.min) / (y.max - y.min);
    const rv = (u.max - u.min) / (v.max - v.min);
    rw > rv
      ? (v.newMax = (u.max - u.min) / rw + v.min)
      : (u.newMax = rw * (v.max - v.min) + u.min);
    if (rw > rv) {
      for (const [id, value] of Object.entries(shapes)) {
        // let newPoints = value.points.map(point => {
        //   return {
        //     x: point.x * sx - sx * x.min,
        //     y: point.y * sy - sy * y.min - (v.max - v.newMax) / 2
        //   };
        // });
        const line1 = [sx, 0, -sx * x.min];
        const line2 = [0, sy, -sy * y.min - (v.max - v.newMax) / 2];
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
    } else {
      for (const [id, value] of Object.entries(shapes)) {
        // let newPoints = value.points.map(point => {
        //   return {
        //     x: point.x * sx - sx * x.min - (u.max - u.newMax) / 2,
        //     y: point.y * sy - sy * y.min
        //   };
        // });
        const line1 = [sx, 0, -sx * x.min - (u.max - u.newMax) / 2];
        const line2 = [0, sy, -sy * y.min];
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
    //
  }
  addEvents() {
    this.$zoomExtend.addEventListener(
      "click",
      this.zoomExtend.bind(this),
      false
    );
    // this.$zoom.addEventListener("click", this.zoom.bind(this));
  }
}
