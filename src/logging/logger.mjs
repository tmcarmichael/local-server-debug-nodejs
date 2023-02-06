import { createLogger, transports, format } from "winston";
import { stream } from "./stream.mjs";

export const loggerNoTimestamp = createLogger({
  transports: [
    new transports.Stream({
      stream: stream
    }),
    new transports.Console({
      level: "info"
    })
  ],
  format: format.combine(
    format.colorize({ all: true }),
    format.printf(({ level, message }) => {
      return `${level}: ${message}`;
    })
  )
});

export const logger = createLogger({
  transports: [
    new transports.Stream({
      stream: stream
    }),
    new transports.Console({
      level: "info"
    })
  ],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  )
});
