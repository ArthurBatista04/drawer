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
