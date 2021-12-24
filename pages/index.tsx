import Form from "../components/Form/Form";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function login({ users }: any) {
  return <Form {...users} />;
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query users {
        users {
          _id
          password
          email
        }
      }
    `,
  });

  return {
    props: {
      users: data,
    },
  };
}
