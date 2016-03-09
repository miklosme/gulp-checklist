const checklist = require('../index.js');
const assert = require('assert');
const gutil = require('gulp-util');
const through = require('through2');

describe('gulp-checklist tests', () => {

  it('shouldn\'t break if the checklist is complete', done => {
    const stream = checklist({
      list: ['foo'],
      onEnd: notFound => {
        if (notFound.length > 0) {
          throw new Error('Should never happen.')
        }

        done();
      }
    });

    stream.write(new gutil.File({
      contents: new Buffer('bar foo baz')
    }));

    stream.end();
  });

  it('should break if not every items are present', done => {
    const stream = checklist({
      list: ['foo'],
      onEnd: notFound => {
        if (notFound.length > 0) {
          done();
        }
      }
    });

    stream.write(new gutil.File({
      contents: new Buffer('bar baz')
    }));

    stream.end();
  });

  it('should work correctly with a `wrap` parameter', done => {
    const stream = checklist({
      list: ['logo', 'logo_image'],
      wrap: 'id="*"',
      onEnd: notFound => {
        if (notFound.length > 0) {
          throw new Error('Should never happen.')
        }

        done();
      }
    });

    stream.write(new gutil.File({
      contents: new Buffer('<h1 id="logo"><img id="logo_image" src="something.png"</h1>')
    }));

    stream.end();
  });

  it('should work correctly with an array as config parameter', done => {
    const stream = checklist(['foo', 'bar', 'baz']);

    stream.write(new gutil.File({
      contents: new Buffer('bar foo baz')
    }));

    stream.end();

    stream.on('finish', () => {
      done();
    });
  });

  it('should continue the stream when told to', done => {
    const stream = checklist({
      list: ['foo', 'bar', 'baz'],
      onEnd: notFound => {
        if (notFound.length > 0) {
          throw new Error('Should never happen.')
        }
      }
    });

    stream.pipe(through.obj(() => {
      done();
    }));

    stream.write(new gutil.File({
      contents: new Buffer('bar foo baz')
    }));
  });
});
