import { gql } from "@apollo/client";

const GET_USERS = gql`
    query users {
        users {
            _id
            email
            password
        }
    }
`;

export { GET_USERS };