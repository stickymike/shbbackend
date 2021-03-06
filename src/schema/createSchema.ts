import { makeSchema,declarativeWrappingPlugin  } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import { join } from "path";
import { Context } from "./types";
import * as allTypes from "./resolvers/CleanUp";

export const schema = makeSchema({
  types: [allTypes],
  plugins: [declarativeWrappingPlugin(),nexusPrismaPlugin({experimentalCRUD: true})],
  // outputs: {
  //   typegen: join(__dirname, "../node_modules/@types/nexus-typegen/index.d.ts")
  // }

  outputs: {
    typegen: join(
      __dirname,
      "../../node_modules/@types/nexus-typegen/index.d.ts"
    ),
    schema: join(__dirname, "../schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});
