import { objectType, booleanArg, stringArg } from "@nexus/schema";
import { TimeRequest } from "./TimeRequest";
// import { User } from "./User";

export const Query = objectType({
  name: "Query",
  definition(t) {
    // t.list.field("users", {
    //   type: "User",
    //   resolve: (parent, args, ctx) => {
    //     return ctx.photon.users.findMany({});
    //   }
    // });
    // t.field("oddTimeRequests",{
    //   type:"TimeRequest",

    // })
    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (parent, args, { prisma, request: { userId: id } }) => {
        if (!id) return null;
        const user = await prisma.user
          .findOne({
            where: { id }
          })
          .catch((): any => null);
        return user;
      }
    });
    t.list.field("test", {
      type: "User",
      args: { where: "UserWhereInput" },
      resolve: (parent, { where }, { prisma }) => {
        return prisma.user.findMany().catch((): any => null);
      }
    });

    t.crud.users({ filtering: true, ordering: true });
    // t.crud.timeCards({ alias: "timeCards", filtering: true, ordering: true });
    t.crud.timeRoles({ alias: "timeRoles", filtering: true, ordering: true });
    t.crud.punchCards({ alias: "punchCards", filtering: true, ordering: true });
    t.crud.punchCard({ alias: "punchCard" });

    t.crud.timeRequest();
    t.crud.timeRequests({ filtering: true, ordering: true });
    // t.crud.taskLists({ filtering: true, ordering: true });
    // t.crud.taskList();
    // t.crud.tasks({ ordering: true });
    // t.crud.task();
  }
});

export default Query;
