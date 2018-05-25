# PDF Server

A Node.js based server to generate PDF files on demand using [Puppeteer](https://www.npmjs.com/package/puppeteer).

The server exposes a simple HTTP API route ```/generate.pdf```, that receives up to two parameters from a POST request body: either an ```html``` string or an```url```.

TODO:

- A way to keep chrome-headless alive, because opening it each time a request is made is expensive.
- Add an ```options``` argument based on [this](https://github.com/GoogleChrome/puppeteer/blob/v1.4.0/docs/api.md#pagepdfoptions).