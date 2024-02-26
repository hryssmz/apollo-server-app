// utils/prisma.ts
import { PrismaClient } from "@prisma/client";
import { prismaLogger, queryLogger } from "./logger";

export const logPrisma = true;

export const prisma = new PrismaClient({
  log: logPrisma
    ? [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
      ]
    : [],
});

prisma.$on("query", e => {
  queryLogger.info(e);
});

prisma.$on("info", e => {
  prismaLogger.info(e);
});

prisma.$on("warn", e => {
  prismaLogger.warn(e);
});

prisma.$on("error", e => {
  prismaLogger.error(e);
});
