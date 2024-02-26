// utils/apollo.ts
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { mocks } from "../mocks";
import { resolvers } from "../resolvers";
import { typeDefs } from "../schemas";
import type { Server } from "node:http";

export const endpoint = "/graphql";

export interface MyContext {
  token?: string;
}

export async function startApolloServer(httpServer: Server, isMock?: boolean) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: endpoint,
  });
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: isMock ? mocks : resolvers,
  });
  const serverCLeanup = useServer({ schema }, wsServer);
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
      ApolloServerPluginCacheControl({}),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCLeanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  return server;
}
