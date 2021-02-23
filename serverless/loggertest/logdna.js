const { createLogger } = require("@logdna/logger");

const options = {
  env: "moop-moop",
  app: "loggertest",
  hostname: "Netlify",
  level: "info", // default level if not set in request
  tags: ["netlify", "function"],
  indexMeta: true,
};

const logger = createLogger(process.env.LOGDNA_API_KEY, options);

// Override console methods to send logs to both LogDNA and stdout/stderr
const { log: consoleLog, error: consoleError } = console;

// console.log = function (message, ...args) {
//   logger.log(message);
//   consoleLog(message, ...args);
// };

// console.error = function (message, ...args) {
//   logger.error(message);
//   consoleError(message, ...args);
// };

exports.logger = logger;

exports.logInfo = (message, ...args) => {
  logger.log(message);
  consoleLog(message, ...args);
};

exports.logError = (message, ...args) => {
  logger.error(message);
  consoleError(message, ...args);
};
