import Shapes from "./shapes.mjs";
import Undoable from "./undoable.mjs";
export default Redux.combineReducers({ Shapes: Undoable(Shapes) });
