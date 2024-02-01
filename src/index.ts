import { createServer } from "node:http";
import app from "./app";
import { startApolloServer } from "./utils/apollo";
import { HOST, PORT, NODE_ENV } from "./utils/env";
import { expressMiddleware } from "@apollo/server/express4";

const httpServer = createServer(app);

async function main() {
  const server = await startApolloServer(httpServer);
  const middleware = expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  });
  app.use("/graphql", middleware);
  await new Promise<void>(resolve =>
    httpServer.listen({ host: HOST, port: PORT }, resolve)
  );
  console.log(`${NODE_ENV} server running on ${HOST}:${PORT}`);
}

main().catch(console.error);
