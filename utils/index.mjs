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
