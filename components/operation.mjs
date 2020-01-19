import { $$, $ } from "../utils/index.mjs";
import { getPresentState } from "../stores/connect.mjs";
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
    let x = getPresentState(this.store, "Shapes");

    let key = Object.keys(x)[0];
    this.store.dispatch({ type: "SELECT", id: key });
  }

  addEvents() {
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
  }
}
