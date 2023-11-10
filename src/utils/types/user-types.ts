export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
  id: number;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  dob: string;
};
