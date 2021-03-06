import { objectType } from "@nexus/schema";

export const TaskList = objectType({
  name: "TaskList",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.tasks();
    t.model.updatedAt();
    t.model.createdAt();
  }
});
