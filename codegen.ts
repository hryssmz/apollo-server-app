import { typeDefs } from "./src/schemas";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: typeDefs,
  generates: {
    "src/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        // "typescript-mongodb",
        "typescript-document-nodes",
      ],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
