import { nexusPrismaPlugin } from "@generated/nexus-prisma";
import { makeSchema } from "nexus";
import { join } from "path";
import { Context } from "./types";
import * as allTypes from "./resolvers/CleanUp";

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon
});

export const schema = makeSchema({
  types: [nexusPrisma, allTypes],
  outputs: {
    typegen: join(__dirname, "../../generated/nexus-typegen.ts"),
    schema: join(__dirname, "../schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});
