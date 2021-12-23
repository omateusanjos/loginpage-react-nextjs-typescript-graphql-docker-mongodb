import { gql } from "apollo-boost";
export const GET_ALL = gql`
  {
    people {
      id
      __typename
      email
      password
    }
  }
`;
