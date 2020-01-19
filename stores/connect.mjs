export function getPresentState(store, reducer) {
  return store.getState()[reducer].present;
}
