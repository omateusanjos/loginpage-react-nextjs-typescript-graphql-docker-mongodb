import Form from "../components/Form/Form";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { usersType } from "../types";
import { GET_USERS } from "../graphql/querys";

export default function index({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return <Form {...users} />;
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { users: usersType };
}> => {
  const client = new ApolloClient({
    uri: `${process.env.URL_API}/api/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_USERS,
  });

  const users: usersType = data;

  return {
    props: { users },
  };
};
