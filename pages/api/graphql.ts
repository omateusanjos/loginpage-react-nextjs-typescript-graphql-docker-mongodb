import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Db, MongoClient } from "mongodb";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/types";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import dotenv from "dotenv";
dotenv.config();

let db: Db;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as any);
        await dbClient.connect();
        db = dbClient.db(process.env.MONGODB_DB);
      } catch (e) {
        console.error(e);
      }
    }

    return { db };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
