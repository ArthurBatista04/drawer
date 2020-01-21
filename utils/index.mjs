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
  const difX = Math.pow(point1.x - point4.x, 2);
  const difY = Math.pow(point1.y - point4.y, 2);
  const hipo = Math.sqrt(difX + difY);
  const distance = hipo / Math.sqrt(2);
  const point2 = { x: point1.x + distance, y: point1.y };
  const point3 = { x: point1.x, y: point1.y + distance };
  const newPoints = [point1, point2, point3, point4];

  return newPoints;
};
