export default function Shapes(state = [], action) {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: {
          shape: action.shape,
          points: action.points,
          selected: false
        }
      };
    case "DELETE":
      return Object.fromEntries(
        Object.entries(state).filter(([k, v]) => k != action.id)
      );
    case "SELECT":
      return Object.fromEntries(
        Object.entries(state).map(([id, value]) => {
          if (id === action.id) {
            return [
              id,
              {
                ...value,
                selected: !value.selected
              }
            ];
          }
          return [id, value];
        })
      );
    case "UPDATE":
      return Object.fromEntries(
        Object.entries(state).map(([id, value]) => {
          if (id === action.id) {
            return [
              id,
              {
                ...value,
                points: action.points
              }
            ];
          }
          return [id, value];
        })
      );

    case "CLEAR":
      return [];
    default:
      return state;
  }
}
