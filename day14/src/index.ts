import { ConsoleAppender } from "./logAppender/consoleAppender";
import { FileAppender } from "./logAppender/fileAppender";
import { SimpleTextFormatter } from "./logFormatter/simpleTextFormatter";
import { simpleLogger } from "./loggers/logger";

const logger = simpleLogger

const textFormatter = new SimpleTextFormatter()
const consoleAppender = new ConsoleAppender(textFormatter)
const fileAppender = new FileAppender(textFormatter)

logger.addAppender(consoleAppender)
// logger.addAppender(fileAppender)

logger.info("this is testing message")
logger.debug("this is debugg message")
logger.warn("server not responding")


// its working

// we can give them colors and all 


