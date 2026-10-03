import { LogFormatterType } from "../logFormatter/logFormatterType";
import { LogMessage } from "../logMessage";
import { LogAppenderType } from "./logAppenderType";

class FileAppender implements LogAppenderType {
  constructor(private formatter: LogFormatterType) {}
  setFormatter(logFormatter: LogFormatterType): void {}

  getFormatter(): LogFormatterType {}

  append(logMessage: LogMessage): void {}
  close(): void {}
}

export { FileAppender };
