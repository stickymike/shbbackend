import { Photon } from "@generated/photon";
import { GraphQLServer } from "graphql-yoga";
import { schema } from "./schema/createSchema";

const photon = new Photon();

const server = new GraphQLServer({
  schema,
  context(ctx) {
    return {
      photon,
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
