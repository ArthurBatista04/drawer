import { $$ } from "../utils/index.mjs";
export default class ListBuilder {
  constructor(store) {
    this.store = store;
    this.$list = document.getElementById("list");
    this.$deleteButtons = [...$$("i[option=deleteShape]")];
  }

  capitlize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  updateList() {
    const objects = this.store.getState()["Shapes"];
    this.$list.innerHTML = `<li class="collection-header"><h4>Elements</h4></li>`;
    for (const [id, value] of Object.entries(objects)) {
      this.$list.innerHTML += `<li id="${id}" class='collection-item'>
      <div>
        ${this.capitlize(
          value.shape + id
        )} <a href='#' class='secondary-content ' 
          ><i class="material-icons red-text" option="deleteShape">delete</i></a
        >
        <a href="#"  class="secondary-content"
          ><i class="material-icons black-text">remove_red_eyes</i></a
        >
      </div>
    </li>`;
    }
    this.$deleteButtons = [...$$("i[option=deleteShape]")];
    this.$deleteButtons.forEach($btn =>
      $btn.addEventListener("click", this.onDelete.bind(this))
    );
  }
  onDelete({ target }) {
    this.store.dispatch({ type: "DELETE", id: target.closest("li").id });
  }

  init() {
    this.store.subscribe(this.updateList.bind(this));
  }
}
