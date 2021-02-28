import { objectType } from "@nexus/schema";

export const PunchCard = objectType({
  name: "PunchCard",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.punchIn();
    t.model.updatedAt();
    t.model.createdAt();
    t.model.timeRole();
    t.model.punchOut();
  }
});
