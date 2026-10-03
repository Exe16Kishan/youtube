import { LogLevel } from "./logLevel";

class LogMessage {
  constructor(
    public level: LogLevel,
    public message: string,
    public timeStamp: Date,
    public loggerName?: string,
    public threadName?: string,
  ) {}
}

export {
    LogMessage
}
