interface users {
  users: user;
}
type user = {
  __typename: string;
  _id: string;
  password: string;
  email: string;
};

export { users, user };