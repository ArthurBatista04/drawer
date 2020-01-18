import { $$ } from "../utils/index.mjs";
export default class Operations {
  constructor(store) {
    this.store = store;
    this.$listDeletes = [...$$("i[option=deleteShape]")];
  }

  onDelete({ target }) {
    console.log(target.closset("li"));
  }

  addEvents() {
    console.log(this.$listDeletes);
    this.$listDeletes.forEach($btn =>
      $btn.addEventListener("click", this.onDelete.bind(this))
    );
  }
}
