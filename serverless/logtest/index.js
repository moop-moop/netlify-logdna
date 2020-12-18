const LogDNA = require("./logdna");

const options = {
  env: "moop-moop",
  app: "logtest",
  hostname: "Netlify",
  apikey: process.env.LOGDNA_API_KEY,
};

const logger = new LogDNA(options);

exports.handler = (event, context, callback) => {
  // Your code here
  logger.log("Hi");
  logger.log("How bout normal log with meta and no level", "WARN", {
    thang: "thing",
  });
  logger.log("How bout normal log with meta and null level", null, {
    thing: "thang",
  });
  logger.log("Try an error", "ERROR");
  callback(null, {
    statusCode: 200,
    body: JSON.stringify("I just wanna log!"),
  });
};
