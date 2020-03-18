import { objectType } from "nexus";

export const TaskGroup = objectType({
  name: "TaskGroup",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.tasks();
    t.model.updatedAt();
    t.model.createdAt();
  }
});
