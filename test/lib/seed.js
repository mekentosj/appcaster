var async = require('async');
var bcrypt = require('bcrypt');
var models = require('./../../models');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('password', salt);

var apps = [
  { url_slug: 'papers', name: 'Papers for Mac' },
  { url_slug: 'pfw', name: 'Papers for Windows' }
];

var builds = [{
  app_id: 1,
  filename: 'papers-abc.dmg',
  identifier: 'papers-1',
  version: '3.2.14',
  version_string: '3.2.14 Starving Bear Edition',
  minimum_system_version: 'Mac OS 10.8.2',
  length: 123456,
  download_url: 'https://example.com/papers-abc.dmg',
  signature: 'kxajfqhofk32fmpanc',
  notes: 'This should be _Markdown_'
}];

var clients = [
  { name: 'gorm', hashed_password: hash }
];

var channels = [{
  app_id: 1,
  url_slug: 'test-abc',
  title: 'beta',
  language: 'en',
  platform: 'Mac OS X',
  description: 'Beta releases'
}, {
  app_id: 2,
  url_slug: 'test-def',
  title: 'alpha',
  language: 'en',
  platform: 'Mac OS X',
  description: 'Alpha releases'
}];

var releases = [{
  build_id: 1,
  channel_id: 1
}];

function seedOne(rows, Model, cb) {
  async.eachSeries(rows, function(row, next) {
    Model.create(row, next);
  }, function(err) {
    cb(err);
  });
}

function seedMany(modelsAndRows, cb) {
  var left = modelsAndRows.length;
  modelsAndRows.forEach(function(item) {
    seedOne(item.rows, item.model, function() {
      left--;
      if (left === 0) cb();
    });
  });
}

module.exports = function(cb) {
  seedMany([
    { rows: apps, model: models.App },
    { rows: builds, model: models.Build },
    { rows: clients, model: models.Client },
    { rows: channels, model: models.Channel },
    { rows: releases, model: models.Release }
  ], cb);
};
