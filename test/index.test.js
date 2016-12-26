'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const setTimeout = require('..').setTimeout;
const setImmediate = require('..').setImmediate;
const setInterval = require('..').setInterval;
const setLogger = require('..').setLogger;
const mm = require('mm');

describe('test/index.test.js', () => {
  afterEach(mm.restore);

  it('should setTimeout', done => {
    const timer = setTimeout(function() {
      clearTimeout(timer);
      done();
    }, 100);
  });

  it('should setInterval', done => {
    const timer = setInterval(function() {
      clearTimeout(timer);
      done();
    }, 100);
  });

  it('should setImmediate', done => {
    const timer = setImmediate(function() {
      clearTimeout(timer);
      done();
    });
  });

  it('should catch error', done => {
    mm(console, 'error', function(message) {
      assert(message.indexOf('error come out!') > -1);
    });

    setTimeout(function() {
      throw new Error('error come out!');
    });

    setTimeout(done, 200);
  });

  it('should support custom logger', done => {
    const fileLogPath = path.join(__dirname, 'error.log');
    setLogger({
      error(message) {
        fs.writeFileSync(fileLogPath, message, { encoding: 'utf8' });
      },
    });

    setTimeout(function() {
      throw new Error('another error!');
    }, 100);

    setTimeout(function() {
      const content = fs.readFileSync(fileLogPath, { encoding: 'utf8' });
      assert(content.indexOf('another error!') > -1);
      fs.unlinkSync(fileLogPath);
      done();
    }, 200);
  });
});
