import { SET_USER } from "@/actions";
import { User } from "@/types";

type ApplicationState = {
  user: User | null;
};
type Action = {
  type: String;
  payload: any;
};

export const initialState: ApplicationState = {
  user: null,
};

const reducer = (state: ApplicationState, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
