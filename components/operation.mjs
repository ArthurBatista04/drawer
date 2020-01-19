import { $$, $ } from "../utils/index.mjs";
export default class Operations {
  constructor(store) {
    this.store = store;
    this.$undo = $("a[option = undo]");
    this.$redo = $("a[option = redo]");
  }

  undo() {
    this.store.dispatch({ type: "UNDO" });
  }
  redo() {
    this.store.dispatch({ type: "REDO" });
  }

  addEvents() {
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
  }
}
