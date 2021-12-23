import axios from "axios";

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(
          ({
            id,
            login,
            avatar_url,
          }): { id: String; login: String; avatar_url: String } => {
            return {
              id,
              login,
              avatar_url,
            };
          }
        );
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_: any, args: { name: String }) => {
      try {
        const user = await axios.get(
          `https://api.github.com/users/${args.name}`
        );
        const { id, login, avatar_url } = user.data;
        return {
          id: id,
          login: login,
          avatar_url: avatar_url,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
