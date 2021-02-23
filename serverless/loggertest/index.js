const { once } = require("events");
const { logger, logInfo, logError } = require("./logdna");

const { error: consoleError } = console;
console.log = logInfo;
console.error = logError;

exports.handler = async (event) => {
  logger.on("error", consoleError);
  const s = encodeURI(event.queryStringParameters.s);
  const rawURIString = event.queryStringParameters.uri || event.path;
  // sanitize input uri
  const uriString = encodeURI(rawURIString);

  // Your code here
  console.log(`${s}: Info log for ${uriString}`);
  console.log({
    s: s,
    uri: uriString,
    example: "this is a sample object log",
    nest: {
      bird: {
        type: "robin",
        state: "Wisconsin",
      },
      food: "worm",
    },
  });
  console.error(`${s}: Error log for ${uriString}`);

  // Ensure logs have been flushed to LogDNA before finishing
  await once(logger, "cleared");
  switch (s) {
    case "301":
      return {
        statusCode: 301,
        headers: {
          Location: `https://www.google.com`,
          "Cache-Control": "public, max-age=0, must-revalidate",
          "x-xss-protection": "1; mode=block",
          "x-frame-options": "SAMEORIGIN",
        },
      };
    case "301-404":
      return {
        statusCode: 301,
        headers: {
          Location: `/notactuallyhere`,
          "Cache-Control": "public, max-age=0, must-revalidate",
          "x-xss-protection": "1; mode=block",
          "x-frame-options": "SAMEORIGIN",
        },
      };
    case "404":
      return {
        statusCode: 404,
        body: `Not found wahh wahh wahhhhhhhh.`,
        headers: {
          "Cache-Control": "public, max-age=0, must-revalidate",
          "x-xss-protection": "1; mode=block",
          "x-frame-options": "SAMEORIGIN",
        },
      };
    default:
      return {
        statusCode: 200,
        body: `Does the happy 200 reponse Log correctly?`,
        headers: {
          "Cache-Control": "public, max-age=0, must-revalidate",
          "x-xss-protection": "1; mode=block",
          "x-frame-options": "SAMEORIGIN",
        },
      };
  }
};
