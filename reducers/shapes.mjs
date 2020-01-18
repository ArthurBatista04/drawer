export default function Shapes(state = [], action) {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: {
          shape: action.shape,
          points: action.points
        }
      };
    default:
      return state;
  }
}
