export type LoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type SavingGoal = {
  totalSavingAmount: number;
  dateToReachGoal: Date;
};
