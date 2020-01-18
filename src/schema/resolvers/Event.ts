import { objectType } from "nexus";

export const Event = objectType({
  name: "Event",
  definition(t) {
    t.model.id();
    t.model.duration();
    t.model.endDateUTC();
    t.model.startDateUTC();
    t.model.name();
    t.model.approved();
    t.model.description();
    t.model.isAllDay();
  }
});
