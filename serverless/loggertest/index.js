const { once } = require("events");
const { logger, logInfo, logError } = require("./logdna");

const { error: consoleError } = console;
console.log = logInfo;
console.error = logError;

exports.handler = async function handler(event, context, callback) {
  logger.on("error", consoleError);

  // Your code here
  console.log("Informational log with helper module");
  console.log({
    example: "this is a sample object log",
    nest: {
      bird: {
        type: "robin",
        state: "Wisconsin",
      },
      food: "worm",
    },
  });
  console.error("Error log");

  // Ensure logs have been flushed to LogDNA before finishing
  await once(logger, "cleared");
  callback(null, {
    statusCode: 200,
    body: JSON.stringify("I just wanna log!"),
  });
};
