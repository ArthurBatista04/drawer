export function getPresentState(store, reducer = "Shapes") {
  return store.getState()[reducer].present;
}

export function getSelectedShapes(store, reducer) {
  return Object.fromEntries(
    Object.entries(getPresentState(store, reducer)).filter(
      ([k, v]) => v.selected == true
    )
  );
}

export function getExtremePoints(store, reducer = "Shapes") {
  const shapes = getPresentState(store, reducer);
  var values = Object.keys(shapes).map(function(key) {
    return shapes[key].points;
  });
  values = values.flat();
  let yMin = values.reduce((min, p) => (p.y < min ? p.y : min), values[0].y);
  let yMax = values.reduce((max, p) => (p.y > max ? p.y : max), values[0].y);
  let xMin = values.reduce((min, p) => (p.x < min ? p.x : min), values[0].x);
  let xMax = values.reduce((max, p) => (p.x > max ? p.x : max), values[0].x);
  return [yMin, yMax, xMin, xMax];
}
