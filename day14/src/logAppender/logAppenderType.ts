import { LogFormatterType } from "../logFormatter/logFormatterType";
import { LogMessage } from "../logMessage";

export interface LogAppenderType{
    setFormatter(logFormatter:LogFormatterType):void
    getFormatter():LogFormatterType
    append(logMessage:LogMessage):void
    close():void
}