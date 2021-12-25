type usersType = {
  users: userType;
}
type userType = {
  __typename: string;
  _id: string;
  password: string;
  email: string;
};

export type { usersType, userType };