var db = require('./../db');
var schema = require('./../models').Client.schema;

exports.up = function(next){
  db.query(schema.create().toQuery(), function(err, result) {
    if (err) throw err;
    next();
  });
};

exports.down = function(next){
  db.query(schema.drop().toQuery(), function(err, result) {
    next(err);
  });
};
