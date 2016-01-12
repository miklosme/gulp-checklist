const checklist = require('../index.js');
const gutil = require('gulp-util');
const should = require('should');

describe('gulp-checklist tests', () => {
  it('shouldn\'t break if the checklist is complete'/*, done => {
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
  }*/);

  it('should break if not every items are present');

  it('should work correctly with a `wrap` parameter');

  it('should allow you to pass a custom callback');

  it('should continue the stream when told to');
});