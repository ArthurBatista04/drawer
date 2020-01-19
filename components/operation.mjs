import { $$, $ } from "../utils/index.mjs";
import { getPresentState } from "../stores/connect.mjs";
export default class Operations {
  constructor(store) {
    this.store = store;
    this.$undo = $("a[option = undo]");
    this.$redo = $("a[option = redo]");
    this.$clear = $("a[option = clear]");
  }

  undo() {
    this.store.dispatch({ type: "UNDO" });
  }
  redo() {
    this.store.dispatch({ type: "REDO" });
  }
  clear() {
    this.store.dispatch({ type: "CLEAR" });
  }
  addEvents() {
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
    this.$clear.addEventListener("click", this.clear.bind(this), false);
  }
}
