import { PrismaClient } from "@prisma/client";
import { myRequest } from "..";
import { Response } from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import { FragmentReplacement } from "graphql-middleware";

export interface myContextParameters {
  request: myRequest;
  response: Response;
  connection: ExecutionParams;
  fragmentReplacements: FragmentReplacement[];
}

export interface Context extends myContextParameters {
  prisma: PrismaClient;
}
