import { $$ } from "../utils/index.mjs";
import { getPresentState } from "../stores/connect.mjs";
export default class ListBuilder {
  constructor(store) {
    this.store = store;
    this.$list = document.getElementById("list");
    this.$deleteButtons = [...$$("i[option=deleteShape]")];
    this.$selectButtons = [...$$("i[option=selectShape]")];
  }

  capitlize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  updateList() {
    const objects = getPresentState(this.store, "Shapes");
    this.$list.innerHTML = `<li class="collection-header"><h4>Shapes</h4></li>`;
    if (objects) {
      for (const [id, value] of Object.entries(objects)) {
        this.$list.innerHTML += `<li id="${id}" class='collection-item'>
      <div>
        ${this.capitlize(
          value.shape + id
        )} <a href='#' option="deleteShape" class='secondary-content ' 
          ><i class="material-icons red-text" option="deleteShape">delete</i></a
        >
        <a href="#" option="selectShape"  class="secondary-content"
          ><i option="selectShape" class="material-icons black-text">remove_red_eyes</i></a
        >
      </div>
    </li>`;
      }
      this.$deleteButtons = [...$$("i[option=deleteShape]")];
      this.$deleteButtons.forEach($btn =>
        $btn.addEventListener("click", this.onDelete.bind(this))
      );
      this.$selectButtons = [...$$("i[option=selectShape]")];
      this.$selectButtons.forEach($btn =>
        $btn.addEventListener("click", this.onSelect.bind(this))
      );
    }
  }
  onSelect({ target }) {
    this.store.dispatch({ type: "SELECT", id: target.closest("li").id });
  }
  onDelete({ target }) {
    this.store.dispatch({ type: "DELETE", id: target.closest("li").id });
  }

  init() {
    this.store.subscribe(this.updateList.bind(this));
  }
}
