export default function Shapes(state = [], action) {
  switch (action.type) {
    case "CREATE":
      return [
        ...state,
        {
          shape: action.shape,
          id: action.id,
          points: action.points
        }
      ];
    default:
      return state;
  }
}
