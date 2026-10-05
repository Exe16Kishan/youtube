import chalk from "chalk";
import { LogMessage } from "../logMessage";
import { LogFormatterType } from "./logFormatterType";

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");
const fatal = chalk.bgRed;
const info = chalk.green;
const debug = chalk.yellow;

export class SimpleTextFormatter implements LogFormatterType {
  format(logMessage: LogMessage): string {
    const dateTime = chalk.black(logMessage.timeStamp.toISOString());

    switch (logMessage.level) {
      case "INFO":
        return `[${dateTime}] [${chalk.blue(logMessage.level)}] : ${info("this is info message")}]`;

      case "DEBUG":
        return `[${dateTime}] [${chalk.blue(logMessage.level)}] : ${debug("this is debugg message")}]`;

      case "FATAL":
        return `[${dateTime}] [${chalk.blue(logMessage.level)}] : ${fatal("this is fatal message")}]`;

      case "ERROR":
        return `[${dateTime}] [${chalk.blue(logMessage.level)}] : ${error("this is info message")}]`;

      case "WARN":
        return `[${dateTime}] [${chalk.blue(logMessage.level)}] : ${warning("this is warn message")}]`;

      default:
        return `unknown logg message`;
    }
  }
}
