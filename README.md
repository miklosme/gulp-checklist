# gulp-checklist [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Ensure that a list of strings are still present in the source.

Throws an error or calls a callback if a string has been deleted accidentally.

*For example, with Google Analytics you may want to place HTML ID's in your templates, for the sole purpose of triggering analytics events. In this case, you definitely need some kind of protection against accidental deletion.*

## Install

```
$ npm install --save-dev gulp-checklist
```

## Usage

The following code will throw an error if an important ID is deleted.

```js
var gulp = require('gulp');
var checklist = require('gulp-checklist');

gulp.task('default', function () {
	gulp.src('./src/**/*.html')
		.pipe(checklist({
		    list: ['VeryImportantID', 'AnotherVeryImportantID'],
		    wrap: 'id="*"'
		}));
});
```

Tip: Store your required strings in a JSON file, and simple get them with a `require('./ids.json')` call.

## License

Released under the MIT license.


[npm-url]: https://npmjs.org/package/gulp-checklist
[npm-image]: http://img.shields.io/npm/v/gulp-checklist.svg?style=flat

[travis-url]: http://travis-ci.org/CAPSLOCKUSER/gulp-checklist
[travis-image]: http://img.shields.io/travis/CAPSLOCKUSER/gulp-checklist.svg?style=flat
