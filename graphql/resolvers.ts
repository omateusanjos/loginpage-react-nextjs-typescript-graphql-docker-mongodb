import GraphQLServerOptions from "apollo-server-core/dist/graphqlOptions";
import { GraphQLRequest } from "apollo-server-types";
import { GraphQLResolveInfo, GraphQLTypeResolver } from "graphql";
import { Context } from "react-apollo";

export const resolvers = {
  Query:  {
    users(
      _parent: GraphQLServerOptions,
      _args: {},
      _context: Context,
      _info: GraphQLResolveInfo
    ): GraphQLTypeResolver<GraphQLResolveInfo, GraphQLRequest> {
      return _context.db.collection("people").find({}).toArray();
    },
    user(
      _parent: GraphQLServerOptions,
      _args: { email: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ): GraphQLTypeResolver<GraphQLResolveInfo, GraphQLRequest> {
      return _context.db.collection("people").findOne({ email: _args.email });
    },
    login(
      _parent: GraphQLServerOptions,
      _args: { email: string, password: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ): GraphQLTypeResolver<GraphQLResolveInfo, GraphQLRequest> {
      const people = _context.db.collection("people").findOne({ email: _args.email, password: _args.password })
      if (people) {
        return people;
      } else {
        throw new Error("User not exists");
      }
    },
  },
  Mutation: {
    createUser(
      _parent: GraphQLServerOptions,
      _args: { user: { email: string, password: string } },
      _context: Context,
      _info: GraphQLResolveInfo
    ): GraphQLTypeResolver<GraphQLResolveInfo, GraphQLRequest> {
     return _context.db
        .collection("people")
        .findOne({ email: _args.user.email }).then((user: { _id: string, email: string, password: string }) => {
          if (user) {
            throw new Error("User already exists");
          }
          return _context.db.collection("people").insertOne(_args.user);
        });
    },
  },
};
