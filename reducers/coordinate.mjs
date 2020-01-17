const initialState = {
  x: null,
  y: null
};
export default function Coordinate(state = initialState, action) {
  switch (action.type) {
    case "UPDATE":
      return Object.assign({}, state, {
        x: action.x,
        y: action.y
      });
    default:
      return state;
  }
}
