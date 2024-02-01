// utils/apollo.ts
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import type { Server } from "node:http";

export interface MyContext {
  token?: string;
}

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => [
      { title: "The Awakening", author: "Kate Chopin" },
      { title: "City of Glass", author: "Paul Auster" },
    ],
  },
};

export async function startApolloServer(httpServer: Server) {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  return server;
}
