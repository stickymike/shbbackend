import { objectType } from "@nexus/schema";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.updatedAt();
    t.model.createdAt();
    t.model.childrenTasks();
    t.model.orderRank();
    t.model.parentTask();
    t.model.taskList();
  }
});
