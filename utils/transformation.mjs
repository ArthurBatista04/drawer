export function multiply(a, b) {
  const bCols = transpose(b);

  return a.map(aRow => bCols.map(bCol => dotProduct(aRow, bCol)));
}

// dotProduct :: Num a => [[a]] -> [[a]] -> [[a]]
const dotProduct = (xs, ys) => sum(zipWith(product, xs, ys));

// GENERIC

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith = (f, xs, ys) =>
  xs.length === ys.length ? xs.map((x, i) => f(x, ys[i])) : undefined;

// transpose :: [[a]] -> [[a]]
const transpose = xs => xs[0].map((_, iCol) => xs.map(row => row[iCol]));

// sum :: (Num a) => [a] -> a
const sum = xs => xs.reduce((a, x) => a + x, 0);

// product :: Num a => a -> a -> a
const product = (a, b) => a * b;

export const getAngle = async () => {
  try {
    const { value: angle } = await Swal.fire({
      title: "Angle",
      input: "text",

      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        } else if (isNaN(value)) {
          return "It must be a number!";
        }
      }
    });

    return parseFloat(angle);
  } catch (e) {
    console.log("error:", e);
    return false;
  }
};

export const getScales = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html:
        "<label for='swal-input1'>X</label>" +
        '<input id="swal-input1" class="swal2-input">' +
        "<label for='swal-input2'>Y</label>" +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const x = document.getElementById("swal-input1").value;
        const y = document.getElementById("swal-input2").value;
        if (!x || !y) {
          Swal.showValidationMessage("You need to write both values!");
        } else if (isNaN(x) || isNaN(y)) {
          Swal.showValidationMessage("Input must be a number!");
        } else {
          return { x: parseFloat(x), y: parseFloat(y) };
        }
      }
    });
    return formValues;
  } catch (e) {
    console.log("error:", e);
    return false;
  }
};

export const getMinVerticeDistance = (shapes, userPoint) => {
  let min = 10000000;
  let minVertice = null;
  for (const [id, value] of Object.entries(shapes)) {
    value.points.forEach(point => {
      const difX = Math.pow(userPoint.x - point.x, 2);
      const difY = Math.pow(userPoint.y - point.y, 2);
      const res = Math.sqrt(difX + difY);
      if (res < min) {
        min = res;
        minVertice = point;
      }
    });
  }
  return minVertice;
};

export const TransformationSize = {
  TRANSLATE: 2,
  ROTATE: 1,
  SCALE: 1
};
