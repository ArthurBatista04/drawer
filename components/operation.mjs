import { $$, $, Toast, GetValues } from "../utils/index.mjs";
import { getSelectedShapes } from "../stores/connect.mjs";
export default class Operations {
  constructor(store) {
    this.store = store;
    this.$undo = $("a[option = undo]");
    this.$redo = $("a[option = redo]");
    this.$clear = $("a[option = clear]");
    this.$transformations = [...$$("a[option=transformation]")];
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
  transformations = {
    TRANSLATE: this.translate,
    ROTATE: this.rotate,
    SCALE: this.scale
  };
  rotate() {}
  scale() {}
  async translate(id, value) {
    const coordinates = await GetValues["TRANSLATE"]();
    if (coordinates) {
      const newPoints = value.points.map(point => {
        return [point.x + coordinates[0], point.y + coordinates[1]];
      });
      this.store.dispatch({ type: "UPDATE", id: id, points: newPoints });
    }
  }
  transformation({ target }) {
    const selectedShapes = getSelectedShapes(this.store, "Shapes");
    if (!jQuery.isEmptyObject(selectedShapes)) {
      const transformation = target.getAttribute("transformation");
      const operation = this.transformations[transformation];
      for (const [id, value] of Object.entries(selectedShapes)) {
        operation(id, value);
      }
    } else {
      Toast.fire({
        icon: "info",
        title: "Select at least one shape to continue"
      });
    }
  }
  addEvents() {
    this.$undo.addEventListener("click", this.undo.bind(this), false);
    this.$redo.addEventListener("click", this.redo.bind(this), false);
    this.$clear.addEventListener("click", this.clear.bind(this), false);
    this.$transformations.forEach($btn =>
      $btn.addEventListener("click", this.transformation.bind(this))
    );
  }
}
