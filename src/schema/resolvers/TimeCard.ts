import { objectType } from "nexus";

export const TimeCard = objectType({
  name: "TimeCard",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.punchTime();
    t.model.updatedAt();
    t.model.createdAt();
    t.model.timeRole();
    // @ts-ignore
    t.model.punchType();
    t.model.punchTime();
  }
});
