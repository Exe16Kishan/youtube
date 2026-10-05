import { LogAppenderType } from "../logAppender/logAppenderType";
import { LogLevel } from "../logLevel";
import { LogMessage } from "../logMessage";

class Logger {
  private appenders: LogAppenderType[] = [];

  constructor(
    private name: string,
    private level: LogLevel,
  ) {}

  addAppender(newAppender: LogAppenderType): void {
    this.appenders.push(newAppender);
  }
  callAppender(logMessage: LogMessage) {
    for (const appender of this.appenders) {
      appender.append(logMessage);
    }
  }

  log(logLevel: LogLevel, message: string): void {
    const newLogMessage = new LogMessage(logLevel, message, new Date());
    this.callAppender(newLogMessage);
  }

  fatal(message: string) {
    this.log(LogLevel.FATAL, message);
  }
  info(message: string) {
    this.log(LogLevel.INFO, message);
  }
  warn(message: string) {
    this.log(LogLevel.WARN, message);
  }
  error(message: string) {
    this.log(LogLevel.ERROR, message);
  }
  debug(message: string) {
    this.log(LogLevel.DEBUG, message);
  }
}


// it works as singleton in nodeJs 
const simpleLogger = new Logger("simple", LogLevel.DEBUG);
export { simpleLogger };
