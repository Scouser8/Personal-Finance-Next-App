import { User } from "@/types";

export const SET_USER = "SET_USER";
export const ADD_SAVING_GOAL = "ADD_SAVING_GOAL";

const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

const addSavingGoal = () => ({
  type: ADD_SAVING_GOAL,
});

export { setUser, addSavingGoal };
