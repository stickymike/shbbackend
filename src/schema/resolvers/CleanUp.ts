import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { User } from "./User";
// import { TimeCard } from "./TimeCard";
import { TimeRole } from "./TimeRole";
import { PunchCard } from "./PunchCard";
import { TimeRequest } from "./TimeRequest";
import { Task } from "./Task";
import { TaskList } from "./TaskList";

// import { Punchtype, Permissions } from "./Enums";

export const resolvers = {
  Query,
  Mutation,
  User,
  TimeRole,
  TimeRequest,
  PunchCard,
  Task,
  TaskList
};
