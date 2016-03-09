'use strict';

var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-checklist';

function defaultOnEnd(notFound, stream) {
  if (notFound.length > 0) {
    var message = 'Not every items from checklist are found! ' + JSON.stringify(notFound);
    stream.emit('error', new PluginError(PLUGIN_NAME, message));
  }
}

function gulpChecklist(params) {
  var options = params;

  if (Array.isArray(options)) {
    options = {
      list: options
    };
  }

  var wrap = (options.wrap || '*').split('*');

  var onEnd = (options.onEnd || defaultOnEnd);

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
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
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
    onEnd(notFound, this);
    cb();
  });
}

module.exports = gulpChecklist;
