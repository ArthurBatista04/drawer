import {
  getAngle,
  getMinVerticeDistance,
  multiply,
  getScales,
  TransformationSize
} from "./transformation.mjs";
export {
  getAngle,
  getMinVerticeDistance,
  multiply,
  TransformationSize,
  getScales
};
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const GetRandomID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
export const ShapeSizes = {
  CIRCLE: 2,
  SQUARE: 2,
  LINE: 2,
  TRIANGLE: 3
};

export const Toast = Swal.mixin({
  toast: true,
  position: "center-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export const ToastMessage = Swal.mixin({
  toast: true,
  position: "center-end",
  showConfirmButton: false
});

export const squarePoints = points => {
  const point4 = points.pop();
  const point1 = points.pop();
  const point2 = { x: point4.x, y: point1.y };
  const point3 = { x: point1.x, y: point4.y };
  const newPoints = [point1, point2, point3, point4];

  return newPoints;
};
export const getExtremePoints = values => {
  values = values.flat();
  let yMin = values.reduce((min, p) => (p.y < min ? p.y : min), values[0].y);
  let yMax = values.reduce((max, p) => (p.y > max ? p.y : max), values[0].y);
  let xMin = values.reduce((min, p) => (p.x < min ? p.x : min), values[0].x);
  let xMax = values.reduce((max, p) => (p.x > max ? p.x : max), values[0].x);
  return [yMin, yMax, xMin, xMax];
};

export const circlePoints = points => {
  const point = points.pop();
  const center = points.pop();
  const radius = Math.sqrt(
    Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
  );
  const point1 = { x: center.x - radius, y: center.y };
  const point2 = { x: center.x + radius, y: center.y };
  const point3 = { x: center.x, y: center.y - radius };
  const point4 = { x: center.x, y: center.y + radius };
  return [center, point1, point2, point3, point4];
};
