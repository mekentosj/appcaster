var db = require('./../db');

function firstResult(result) {
  return result && result.rows ? result.rows[0] : null;
}

function findOne(query, cb) {
  db.query(query.text, query.values, function(err, result) {
    cb(err, firstResult(result));
  });
}

function findAll(query, cb) {
  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows : null);
  });
}

function toIntegerArray(a) {
  return a.map(function(v) { return parseInt(v, 10); });
}

module.exports = {
  findAll: findAll,
  findOne: findOne,
  firstResult: firstResult,
  toIntegerArray: toIntegerArray
};
