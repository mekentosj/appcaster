var async = require('async');
var bcrypt = require('bcrypt');
var models = require('./../../models');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('password', salt);

var apps = [
  { url_id: 'papers', name: 'Papers for Mac' },
  { url_id: 'pfw', name: 'Papers for Windows' }
];

var clients = [
  { name: 'gorm', hashed_password: hash }
];

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
    { rows: clients, model: models.Client }
  ], cb);
};
