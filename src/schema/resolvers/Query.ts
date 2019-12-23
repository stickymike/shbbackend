import { objectType, booleanArg, stringArg } from "nexus";

export const Query = objectType({
  name: "Query",
  definition(t) {
    // t.list.field("users", {
    //   type: "User",
    //   resolve: (parent, args, ctx) => {
    //     return ctx.photon.users.findMany({});
    //   }
    // });
    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (parent, args, { photon, request: { userId: id } }) => {
        if (!id) return null;
        const user = await photon.users
          .findOne({
            where: { id }
          })
          .catch((): any => null);
        return user;
      }
    });
    t.list.field("test", {
      type: "String",

      resolve: (parent, args, ctx) => {
        return ["this"];
      }
    });
    t.crud.users({ filtering: true, ordering: true });
    // t.crud.timeCards({ alias: "timeCards", filtering: true, ordering: true });
    t.crud.timeRoles({ alias: "timeRoles", filtering: true, ordering: true });
    t.crud.punchCards({ alias: "punchCards", filtering: true, ordering: true });
    t.crud.punchCard({ alias: "punchCard" });
    t.crud.event();
    t.crud.events({ filtering: true, ordering: true });
  }
});

export default Query;
