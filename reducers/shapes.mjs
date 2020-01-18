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
    case "DELETE":
      return Object.fromEntries(
        Object.entries(state).filter(([k, v]) => k != action.id)
      );

    default:
      return state;
  }
}
