import { gql } from "apollo-boost";
export const GET_LOGIN = gql`
  query getLogin($email: String!, $password: String!) {
    peopleByEmail(email: $email, password: $password) {
      email
      password
    }
  }
`;
