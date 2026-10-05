import { LogMessage } from "../logMessage";
import { LogFormatterType } from "./logFormatterType";

class SimpleTextFormatter implements LogFormatterType {
  format(logMessage: LogMessage): string {
    const dateTime = logMessage.timeStamp.toISOString();
    const logMsg = `[${dateTime} [${logMessage.level}] : ${logMessage.message}]`;
    return logMsg;
  }
}
