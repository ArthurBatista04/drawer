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

export function getPoints(store, reducer = "Shapes") {
  const shapes = getPresentState(store, reducer);
  return Object.keys(shapes).map(function(key) {
    return shapes[key].points;
  });
}
