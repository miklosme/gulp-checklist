var gulp = require('gulp');
var checklist = require('../index.js');

var list = require('./required_ids.json').id;

gulp.task('default', function () {
  gulp.src(['./webpage.html'])
    .pipe(checklist({
      list: list,
      wrap: 'id="*"',
      onEnd: function(notFound) {
        console.log('The result is:', JSON.stringify(notFound));
      }
    }));
});
