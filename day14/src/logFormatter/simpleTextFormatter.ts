import { LogMessage } from "../logMessage";
import { LogFormatterType } from "./logFormatterType";

class SimpleTextFormatter implements LogFormatterType {
    format(logMessage: LogMessage): string {
        // will create a proper string and return it to the method which calls it 
        // for now lets return empty string
        return " "
    }
}

