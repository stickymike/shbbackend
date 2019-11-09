import * as cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import * as express from "express";
import * as dotenv from "dotenv";
// import aServer from "./apolloServer";
import { Request } from "express-serve-static-core";
import server from "./server";

export interface myRequest extends Request {
  userId?: string;
}

dotenv.config();

server.express.use(cookieParser());

server.express.use((req: myRequest, _res, next) => {
  const { token } = req.cookies;
  let id: string = "";
  if (token) {
    jwt.verify(token, process.env.APP_SECRET, (_err: any, args: any) => {
      if (args && args.userId) {
        id = args.userId;
      }
    });
  }
  req.userId = id;
  next();
});

server.start(
  {
    endpoint: "/graphql",
    playground: "/graphql",
    subscriptions: false,
    debug: true,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  },
  () => console.log(`🚀 Server ready1`)
);

// const app = express();

// app.use(cookieParser());

// app.use((req: myRequest, _res, next) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, process.env.APP_SECRET, (_err: any, args: any) => {
//       if (args && args.userId) {
//         req.userId = args.userId;
//       }
//     });
//   }
//   next();
// });

// aServer.applyMiddleware({ app });

// app.listen({ port: 4000 }, () => {
//   console.log(`🚀 Server ready at: http://localhost:4000`);
// });
