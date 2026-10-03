import { LogMessage } from "../logMessage";

 export interface LogFormatterType{
    format (logMessage:LogMessage):string
}