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
  _id: string;
  totalSavingAmount: number;
  dateToReachGoal: Date;
  monthlyAmount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
