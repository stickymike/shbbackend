import { objectType, idArg, stringArg, intArg, booleanArg, arg } from "nexus";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ApolloError } from "apollo-server-express";
import { User } from "@generated/photon";
import moment, { duration } from "moment";
import { RRule, RRuleSet, rrulestr } from "rrule";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("resetPassword", {
      type: "User",
      args: {
        password: stringArg({ nullable: false }),
        id: idArg({ nullable: false })
      },
      resolve: async (_p, { id, password }, { photon }) => {
        const hashedPassword = await hash(password, 10);
        return await photon.users.update({
          data: { password: hashedPassword },
          where: { id }
        });
      }
    });
    t.field("createUser", {
      type: "User",
      args: {
        firstName: stringArg({ nullable: false }),
        lastName: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
        title: stringArg(),
        password: stringArg({ nullable: false }),
        code: intArg({ nullable: false })
      },
      resolve: async (
        _p,
        { firstName, lastName, code, email, password, title },
        ctx
      ) => {
        email = email.toLowerCase();
        await ctx.photon.users
          .findOne({
            where: { code }
          })
          .then((_: any) => {
            throw new ApolloError("Code Taken", "Code");
          })
          .catch((_: any) => {});
        await ctx.photon.users
          .findOne({
            where: { email }
          })
          .then((_: any) => {
            throw new ApolloError("Email Taken", "Email");
          })
          .catch((_: any) => {});
        const hashedPassword = await hash(password, 10);
        const user = await ctx.photon.users
          .create({
            data: {
              firstName,
              code,
              lastName,
              email,
              title,
              password: hashedPassword
            }
          })
          .catch((e: Error) => {
            throw new Error(e.message);
          });
        // const token = sign({ userId: user.id }, process.env.APP_SECRET);

        // ctx.response.cookie("token", token, {
        //   httpOnly: true,
        //   maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
        // });
        return user;
      }
    });

    t.field("signin", {
      type: "User",
      args: {
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (_p, { email, password }, ctx) => {
        const user = await ctx.photon.users
          .findOne({ where: { email } })
          .catch((_: any) => {
            throw new ApolloError(
              `No such user found for email ${email}`,
              "username"
            );
          });

        const valid = await compare(password, user.password);
        if (!valid) throw new ApolloError(`Invalid Password`, "password");

        const token = sign({ userId: user.id }, process.env.APP_SECRET);
        ctx.response.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
        });

        return user;
      }
    });
    t.field("signout", {
      type: "String",
      resolve: (_p, _a, ctx) => {
        ctx.response.clearCookie("token");
        return "Logged Out";
      }
    });

    t.field("resetPassword", {
      type: "User",
      args: {
        id: idArg(),
        password: stringArg()
      },
      resolve: async (_p, { id, password }, { photon }) => {
        password = await hash(password, 10);
        const user = await photon.users.update({
          data: {
            password
          },
          where: { id }
        });
        return user;
      }
    });

    t.field("clockcodetouser", {
      type: "User",
      args: { code: intArg() },
      resolve: async (_p, { code }, { photon }) => {
        return await photon.users.findOne({ where: { code } }).catch(() => {
          throw new ApolloError(`No such user for code ${code}`, "code");
        });
      }
    });

    t.field("deleteTimeRole", {
      type: "TimeRole",
      args: { id: idArg() },
      resolve: async (_p, { id }, { photon }) => {
        const users: User[] = await photon.timeRoles

          .findOne({ where: { id } })
          .users();
        let userList = "";
        users.map((user, i) => {
          console.log(user);
          userList += `${user.firstName} ${user.lastName}`;
          if (i < users.length - 1) userList += ", ";
        });
        if (users.length > 0) {
          throw new ApolloError(
            `Cannot Delete Time Role Previously Punched by ${userList}`,
            "code"
          );
        }
        return photon.timeRoles.delete({ where: { id } });
      }
    });

    // t.field("createTimeRequest", {
    //   type: "Event",
    //   args: {
    //     isAllDay: booleanArg({ nullable: false }),
    //     startDateUTC: stringArg({ nullable: false }),
    //     duration: intArg({ nullable: false }),
    //     name: stringArg({ nullable: false }),
    //     recurPattern: stringArg({ nullable: true })
    //   },
    //   resolve: async (_p, args, { photon }) => {
    //     const newArgs = {
    //       endDateUTC: moment(args.startDateUTC)
    //         .add(args.startDateUTC, "minutes")
    //         .toDate(),
    //       isRecurring: !!args.recurPattern,
    //       startDateUTC: moment(args.startDateUTC).toDate()
    //     };

    //     const recur = rrulestr(
    //       `DTSTART:${args.startDateUTC}\nRRULE:${args.recurPattern}`
    //     );
    //     console.log(recur);

    //     return null;
    //     // return await photon.events.create({ data: { ...args, ...newArgs } });
    //   }
    // });

    //user CRUD
    t.crud.deleteOneUser({ alias: "deleteUser" });
    t.crud.updateOneUser({ alias: "updateUser" });

    //timecard CRUD
    // t.crud.deleteOneTimeCard({ alias: "deleteTimeCard" });
    // t.crud.createOneTimeCard({ alias: "createTimeCard" });
    // t.crud.updateOneTimeCard({ alias: "updateTimeCard" });

    //punchcard CRUD
    t.crud.deleteOnePunchCard({ alias: "deletePunchCard" });
    t.crud.createOnePunchCard({ alias: "createPunchCard" });
    t.crud.updateOnePunchCard({ alias: "updatePunchCard" });

    //timerole CRUD
    t.crud.createOneTimeRole({ alias: "createTimeRole" });
    t.crud.updateOneTimeRole({ alias: "updateTimeRole" });

    //Event CRUD
    t.crud.createOneTimeRequest({ alias: "createTimeRequest" });
    t.crud.updateOneTimeRequest({ alias: "updateTimeRequest" });
    t.crud.deleteOneTimeRequest({ alias: "deleteTimeRequest" });

    //TaskGroup
    t.crud.createOneTaskGroup();
    t.crud.updateOneTaskGroup();
    t.crud.deleteOneTaskGroup();

    //Task CRUD
    t.crud.createOneTask();
    t.crud.updateOneTask();
    t.crud.deleteOneTask();
  }
});
