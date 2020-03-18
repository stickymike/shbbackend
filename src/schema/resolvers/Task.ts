import { objectType } from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.updatedAt();
    t.model.createdAt();
    t.model.childrenTasks();
  }
});
