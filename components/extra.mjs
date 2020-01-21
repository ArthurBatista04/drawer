import { $ } from "../utils/index.mjs";

export default class Extras {
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
  logKey(e) {
    if (e.key === "z") {
      this.undo();
    } else if (e.key === "y") {
      this.redo();
    }
  }
  addEvents() {
    document.addEventListener("keydown", this.logKey.bind(this), false);
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
    this.$clear.addEventListener("click", this.clear.bind(this), false);
  }
}
