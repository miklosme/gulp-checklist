'use strict';

var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-checklist';

function gulpChecklist(options) {

  var wrap = (options.wrap || '*').split('*');

  var onEnd = (options.onEnd || function(notFound) {
    if (notFound.length > 0) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Not every items from checklist are found! [' + notFound + ']'));
    }
  });

  var search = _.map(options.list, function (item) {
    return wrap.join(item);
  });

  var notFound = _.map(search, _.clone);

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      return;
    }

    var content = file.contents.toString(enc);

    _.forEach(search, function(item) {
      if (content.indexOf(item) !== -1) {
        notFound = _.without(notFound, item);
      }
    });

    cb(null, file);
  }, function (cb) {
    onEnd();
    cb();
  });
}

module.exports = gulpChecklist;