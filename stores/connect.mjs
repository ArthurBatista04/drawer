export function getPresentState(store, reducer) {
  return store.getState()[reducer].present;
}

export function getSelectedShapes(store, reducer) {
  return Object.fromEntries(
    Object.entries(getPresentState(store, reducer)).filter(
      ([k, v]) => v.selected == true
    )
  );
}
