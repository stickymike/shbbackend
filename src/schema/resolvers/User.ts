import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.firstName();
    t.model.lastName();
    t.model.id();
    t.model.email();
    t.model.title();
    t.model.createdAt();
    t.model.updatedAt();
    // t.model.timeCards({ pagination: true, ordering: true });
    t.model.timeRoles();
    t.model.code();
    t.string("recentTimeRoleId", {
      resolve: async ({ id }, _args, { prisma: photon }) => {
        const lastPunch = await photon.punchCard.findMany({
          where: { user: { id } },
          orderBy: { punchOut: "desc" },
          first: 1,
          include: { timeRole: true }
        });
        if (lastPunch.length === 0) {
          const firstTimeRole = await photon.user
            .findOne({
              where: { id }
            })
            .timeRoles()
            .catch(() => "");
          if (firstTimeRole.length === 0) return "";
          //@ts-ignore
          return firstTimeRole[0].id;
        }
        return lastPunch[0].timeRole.id;
      }
    });
    t.string("clockedIn", {
      resolve: async ({ id }, _args, { prisma: photon }) => {
        const lastPunch = await photon.punchCard.findMany({
          where: { user: { id } },
          orderBy: { punchOut: "desc" },
          first: 1
        });

        if (lastPunch.length === 0) return "";
        const { punchIn, punchOut, id: punchId } = lastPunch[0];

        return punchIn.toISOString() === punchOut.toISOString() ? punchId : "";
      }
    });
    t.model.permissions();
  }
});
