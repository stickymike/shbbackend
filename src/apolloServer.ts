// // import { Photon } from "@prisma/photon";
// import { ApolloServer } from "apollo-server-express";
// import { schema } from "./schema/createSchema";

// // const photon = new Photon();

// const aServer = new ApolloServer({
//   schema,
//   context(ctx) {
//     return {
//       photon,
//       ...ctx
//     };
//   },

//   debug: false
// });

// // server.start(
// //   {
// //     endpoint: "/graphql",
// //     playground: "/graphql",
// //     subscriptions: false
// //     // cors: {
// //     //   credentials: false,
// //     //   origin: process.env.FRONTEND_URL
// //     // }
// //   },
// //   () => console.log(`🚀 Server ready`)
// // );

// export default aServer;
