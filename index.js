'use strict';

var _ = require('lodash');
var through = require('through2');
var contains = require('gulp-contains');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-checklist';

function gulpChecklist(options) {

  var wrap = (options.wrap || '').split('*');

  var search = _.map(options.list, function(item) {
    return wrap.join(item);
  });

  let notFound = _.map(search, _.clone);

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    if (file.isBuffer()) {
      throw new PluginError(PLUGIN_NAME, 'Buffer not suported.');
    }

    if (file.isStream()) {
      file.contents = file.contents
        .pipe(contains({
          search: search,
          onFound: function(string) {
            notFound = _.without(notFound, string);
            return false;
          }
        }))
        .on('end', function() {
          if (notFound.length > 0) {
            throw new PluginError(PLUGIN_NAME, 'Some checklist items are not present: [' + notFound + ']');
          }
        });
    }

    return cb(null, file);
  });
}

module.exports = gulpChecklist;