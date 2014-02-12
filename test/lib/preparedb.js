var assert = require('assert');
var async = require('async');
var fs = require('fs');
var migrate = require('migrate');

function migrations() {
  return fs.readdirSync('migrations').filter(function(file){
    return file.match(/^\d+.*\.js$/);
  }).sort().map(function(file){
    return './../../migrations/' + file;
  });
}

function prepareDb(cb) {
  var Models = require('./../../models');

  async.eachSeries(migrations().reverse(), function(migration, next) {
    require(migration).down(function() {
      next();
    });
  }, function(err) {
    async.eachSeries(migrations(), function(migration, next) {
      require(migration).up(next);
    }, function() {
      cb();
    });
  });
}

module.exports = prepareDb;
