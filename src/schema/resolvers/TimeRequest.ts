import { objectType } from "nexus";

export const TimeRequest = objectType({
  name: "TimeRequest",
  definition(t) {
    t.model.id();
    t.model.startTime();
    t.model.endTime();
    t.model.approved();
    t.model.reason();
    t.model.isAllDay();
    t.model.user();
    t.model.updatedAt();
    t.model.createdAt();
  }
});
