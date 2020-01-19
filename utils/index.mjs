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

const translate = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Position to translate",
      html:
        "<label>X</label>" +
        '<input id="swal-input1" class="swal2-input">' +
        "<label>Y</label>" +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      inputValidator: value => {
        if (!value[0] || !value[1]) {
          return "You need to write something!";
        } else if (isNAN(value[0]) || isNaN(value[1])) {
          return "Input only accepts numbers!";
        }
      },
      preConfirm: () => {
        const x = document.getElementById("swal-input1").value;
        const y = document.getElementById("swal-input2").value;
        if (!x || !y) {
          Swal.showValidationMessage("You need to write both coordiantes!");
        } else if (isNaN(x) || isNaN(y)) {
          Swal.showValidationMessage("Input only accepts numbers!");
        } else {
          return [parseFloat(x), parseFloat(y)];
        }
      }
    });

    return formValues;
  } catch (e) {
    console.log("error:", e);
    return false;
  }
};
export const GetValues = {
  TRANSLATE: translate
  // ROTATE: rotate,
  // SCALE: scale
};
