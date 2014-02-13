var db = require('./../db');

function firstResult(result) {
  return result && result.rows ? result.rows[0] : null;
}

function findOne(query, cb) {
  db.query(query.text, query.values, function(err, result) {
    cb(err, firstResult(result));
  });
}

module.exports = {
  findOne: findOne,
  firstResult: firstResult
};
