import { objectType } from "nexus";

export const TimeRole = objectType({
  name: "TimeRole",
  definition(t) {
    t.model.id();
    t.model.users();
    t.model.name();
    t.model.shortName();
    t.model.description();
    t.model.payRate();
    t.model.updatedAt();
    t.model.createdAt();
  }
});

// type TimeRole {
//   id          ID        @default(cuid()) @id @unique
//   name        String
//   shortName   String
//   description String
//   payRate     Int
//   users       User[]
//   updatedAt   DateTime  @updatedAt
//   createdAt   DateTime  @default(now())
// }
