var gulp = require('gulp');
var checklist = require('../index.js');

var list = require('./required_ids.json').id;

gulp.task('default', function () {
  gulp.src(['./webpage.html', './webpage2.html'])
    .pipe(checklist({
      list: list,
      wrap: 'id="*"',
      onEnd: function(notFound) {
        console.log('not found', notFound);
      }
    }));
  //.pipe(checklist(['foo', 'bar', 'id="baz"']));
});