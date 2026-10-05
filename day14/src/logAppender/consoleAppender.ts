import { LogFormatterType } from "../logFormatter/logFormatterType";
import { LogMessage } from "../logMessage";
import { LogAppenderType } from "./logAppenderType";

class ConsoleAppender implements LogAppenderType {
  constructor(private formatter: LogFormatterType) {}
  setFormatter(logFormatter: LogFormatterType): void {
    this.formatter = logFormatter
  }

  getFormatter(): LogFormatterType {
    return this.formatter
  }

  append(logMessage: LogMessage): void {
    const formatMessage = this.formatter.format(logMessage)
    console.log(formatMessage)
  }
  close(): void {
    
  }
}

export {
    ConsoleAppender
}