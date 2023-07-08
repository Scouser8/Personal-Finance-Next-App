import { SET_USER, UPDATE_SAVING_GOALS_LIST } from "@/actions";
import { SavingGoal, User } from "@/types";

type ApplicationState = {
  user: User | null;
  savingGoals: SavingGoal[];
};
type Action = {
  type: String;
  payload: any;
};

export const initialState: ApplicationState = {
  user: null,
  savingGoals: [],
};

const reducer = (state: ApplicationState, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_SAVING_GOALS_LIST:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
