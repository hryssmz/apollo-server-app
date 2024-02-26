import { createServer } from "node:http";
import { expressMiddleware } from "@apollo/server/express4";
import app from "./app";
import { endpoint, startApolloServer } from "./utils/apollo";
import { HOST, MOCK_PORT, PORT, NODE_ENV } from "./utils/env";

const httpServer = createServer(app);

async function main() {
  const isMock = process.argv.indexOf("--mock") > -1;
  const server = await startApolloServer(httpServer, isMock);
  const port = isMock ? MOCK_PORT : PORT;
  const serverType = isMock ? "mock" : NODE_ENV;
  const middleware = expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  });
  app.use(endpoint, middleware);
  await new Promise<void>(resolve =>
    httpServer.listen({ host: HOST, port }, resolve)
  );
  console.log(`${serverType} server running on ${HOST}:${port}`);
}

main().catch(console.error);
