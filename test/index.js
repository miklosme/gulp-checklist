const checklist = require('../index.js');
const assert = require('assert');
const gutil = require('gulp-util');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      setTimeout(function() {
        done();
      }, 1000);
    });
  });
});

describe('gulp-checklist tests', () => {
  it('shouldn\'t break if the checklist is complete', done => {
    const stream = checklist({
      list: ['asd'],
      onEnd(notFound) {
        console.log('NOT FOUND', notFound);
        done();
      }
    });

    stream.write(new gutil.File({
      contents: new Buffer('something')
    }));
  });

  it('should break if not every items are present');

  it('should work correctly with a `wrap` parameter');

  it('should allow you to pass a custom callback');

  it('should continue the stream when told to');
});
