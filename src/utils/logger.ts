// utils/logger.ts
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.printf(
      ({ level, message, timestamp }) =>
        `[${level.toUpperCase()}]\t${timestamp}\t${message}`
    )
  ),
  transports: [new transports.Console()],
});

export const queryLogger = createLogger({
  level: "info",
  format: format.json(),
  transports: [new transports.File({ filename: "log/query.log" })],
});

export const prismaLogger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.printf(
      ({ level, message, timestamp }) =>
        `[${level.toUpperCase()}]\t${timestamp}\t${message}`
    )
  ),
  transports: [new transports.File({ filename: "log/prisma.log" })],
});
