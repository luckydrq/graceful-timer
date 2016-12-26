# graceful-timer

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/graceful-timer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/graceful-timer
[download-image]: https://img.shields.io/npm/dm/graceful-timer.svg?style=flat-square
[download-url]: https://npmjs.org/package/graceful-timer

Graceful timer for catch errors. I make this module bacause i come
across some problems when i try to run some isomophic code on the
nodejs server. Some code maybe makes sense in the browser, but
dangrous in server environment, for example:

```js
try {
  xxx
} catch (e) {
  // for some purposes, we do asychronous error thrown
  setTimeout(function() {
    throw e;
  }, 0);
}
```

## API
Just use as the same as the original global timers api. The only
thing this module does is wrap the `callback` with `try catch`.

- setTimeout

- setInterval

- setImmediate

- setLogger
It will use `global.console` as default logger. However, you can
customize your own logger only if the `.error` method is provided.

```js
const { setLogger } = require('graceful-timer');

setLogger({
  error(stack) {
    // make a http request to upload error info
    uploadErrorInfo(stack);

    // fileLogger.writeLog(stack);
  }
});
```

## Lisence
MIT
