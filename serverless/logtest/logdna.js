/* eslint-disable no-console */
const fetch = require('isomorphic-unfetch');

class LogDNA {
  constructor(options = { hostname: 'host', app: 'logdna', env: 'test', apikey: null }) {
    this.hostname = options.hostname;
    this.app = options.app;
    this.env = options.env;
    this.apikey = options.apikey;
  }

  async log(line = 'Default log line.', level = 'INFO', meta = {}) {
    const body = {
      app: this.app,
      env: this.env,
      level,
      line,
      meta
    };

    const response = await fetch(`https://logs.logdna.com/logs/ingest?hostname=${this.hostname}`, {
      method: 'post',
      body: JSON.stringify({ lines: [body] }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'apikey': this.apikey
      }
    });
    const json = await response.json();
    return Promise.resolve(console.log(json));
  }
}

module.exports = LogDNA;
