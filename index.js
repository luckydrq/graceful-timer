'use strict';

let logger = global.console;

exports.setLogger = function(l) {
  logger = l;
};

exports.setTimeout = _set('setTimeout');
exports.setInterval = _set('setInterval');
exports.setImmediate = _set('setImmediate');

function _set(name) {
  let f;
  const originFn = global[name];
  const code = `
    f = function ${name}() {
      const args = [].slice.call(arguments, 0);
      let fn = args[0];
      if (typeof fn === 'function') {
        fn = args[0] = wrapFn(fn);
      }
      return originFn.apply(global, args);
    }
  `;
  eval(code);
  return f;
}

function wrapFn(fn) {
  return function() {
    try {
      return fn();
    } catch (e) {
      logger.error(e.stack);
    }
  };
}
