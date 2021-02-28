import { PrismaClient } from "@prisma/client";
import { GraphQLServer } from "graphql-yoga";
import { schema } from "./schema/createSchema";

const prisma = new PrismaClient();
const server = new GraphQLServer({
  schema,
  context(ctx) {
    return {
      prisma,
      ...ctx
    };
  }
});

// server.start(
//   {
//     endpoint: "/graphql",
//     playground: "/graphql",
//     subscriptions: false
//     // cors: {
//     //   credentials: false,
//     //   origin: process.env.FRONTEND_URL
//     // }
//   },
//   () => console.log(`🚀 Server ready`)
// );

export default server;
