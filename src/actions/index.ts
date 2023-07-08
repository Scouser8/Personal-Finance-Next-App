import { SavingGoal, User } from "@/types";

export const SET_USER = "SET_USER";
export const UPDATE_SAVING_GOALS_LIST = "UPDATE_SAVING_GOALS_LIST";

const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

const updateSavingGoalsList = (savingGoalsList: SavingGoal[]) => ({
  type: UPDATE_SAVING_GOALS_LIST,
  payload: savingGoalsList,
});

export { setUser, updateSavingGoalsList };
