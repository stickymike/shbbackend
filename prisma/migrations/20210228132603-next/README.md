# Migration `20210228132603-next`

This migration has been generated by stickymike at 2/28/2021, 1:26:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Task";

DROP TABLE "public"."TaskList";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210228131203-first..20210228132603-next
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://ccyleywleafutj:a89e2a184f59f70bb6a5ddef9f042f4cd95934195c4c31f3054e72ea216deb33@ec2-54-221-225-11.compute-1.amazonaws.com:5432/d4v0s437vieiac?sslaccept=accept_invalid_certs"
   enabled  = true
 }
 model User {
@@ -17,9 +17,9 @@
   lastName    String
   title       String?
   createdAt   DateTime      @default(now())
   updatedAt   DateTime      @updatedAt
-  timeRoles   TimeRole[]
+  timeRoles   TimeRole[]    @relation(references: [id])
   punchCards  PunchCard[]
   permissions Permission[]
   events      TimeRequest[]
 }
@@ -42,9 +42,9 @@
   name        String
   shortName   String
   description String
   payRate     Int
-  users       User[]
+  users       User[]      @relation(references: [id])
   punchCards  PunchCard[]
   updatedAt   DateTime    @updatedAt
   createdAt   DateTime    @default(now())
 }
@@ -73,24 +73,24 @@
   createdAt DateTime @default(now())
   userId    String
 }
-model TaskList {
-  id        String   @id @default(cuid())
-  name      String
-  tasks     Task[]
-  updatedAt DateTime @updatedAt
-  createdAt DateTime @default(now())
-}
+// model TaskList {
+//   id        String   @id @default(cuid())
+//   name      String
+//   tasks     Task[]
+//   updatedAt DateTime @updatedAt
+//   createdAt DateTime @default(now())
+// }
-model Task {
-  id            String    @id @default(cuid())
-  name          String
-  orderRank     Float
-  parentTask    Task?     @relation(name: "newTaskCheck")
-  childrenTasks Task[]    @relation(name: "newTaskCheck")
-  updatedAt     DateTime  @updatedAt
-  createdAt     DateTime  @default(now())
-  TaskList      TaskList? @relation(fields: [taskListId], references: [id])
-  taskListId    String?
-  taskId        String?
-}
+// model Task {
+//   id            String    @id @default(cuid())
+//   name          String
+//   orderRank     Float
+//   parentTask    Task?     @relation(name: "newTaskCheck")
+//   childrenTasks Task[]    @relation(name: "newTaskCheck")
+//   updatedAt     DateTime  @updatedAt
+//   createdAt     DateTime  @default(now())
+//   TaskList      TaskList? @relation(fields: [taskListId], references: [id])
+//   taskListId    String?
+//   taskId        String?
+// }
```


