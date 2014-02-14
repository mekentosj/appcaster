var db = require('./../db');
var bcrypt = require('bcrypt');
var sql = require('sql');
var utils = require('./utils');

function Client() {
  this.schema = Client.schema;
}

Client.schema = sql.define({
  name: 'clients',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'name', dataType: "varchar(100) NOT NULL CHECK (name <> '')", unique: true },
    { name: 'hashed_password', dataType: "varchar(100) NOT NULL CHECK (hashed_password <> '')" }
  ]
});

Client.auth = function(name, password, cb) {
  var query = this.schema.select('*')
    .where(this.schema.name.equals(name))
    .toQuery();

  utils.findOne(query, function(err, user) {
    if (err || !user) return cb(err);
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

Client.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

Client.register = function(name, password, cb) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  var query = this.schema.insert({
    name: name,
    hashed_password: hash
  }).returning('*').toQuery();

  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

module.exports = Client;
