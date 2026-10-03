import { LogAppenderType } from "../logAppender/logAppenderType";
import { LogLevel } from "../logLevel";

class Logger {
  private appenders: LogAppenderType[] = [];

  constructor(
    private name: string,
    private level: LogLevel,
    private additivity: boolean = true,
  ) {}

  addAppender(newAppender: LogAppenderType): void {}
  callAppender() {}
  getEffectiveLever(): LogLevel {}
  setAdditivity(additivity: boolean): void {}
  log(logLevel: LogLevel, message: string): void {}

  fatal() {}
  info() {}
  warn() {}
  error() {}
  debug() {}
}
