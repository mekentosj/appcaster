var db = require('./../db');
var models = require('./../models');

exports.up = function(next){
  db.query(models.App.create().toQuery(), function(err, result) {
    if (err) throw err;
    next();
  });
};

exports.down = function(next){
  db.query(models.App.drop().toQuery(), function(err, result) {
    if (err) throw err;
    next();
  });
};
