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

Client.delete = function(id, cb) {
  var query = this.schema.delete()
    .from(this.schema)
    .where(this.schema.id.equals(id))
    .toQuery();

  db.query(query.text, query.values, cb);
};

Client.find = function(id, cb) {
  var query = this.schema.select('*')
    .from(this.schema)
    .where(this.schema.id.equals(id))
    .toQuery();

  utils.findOne(query, cb);
};

Client.findAll = function(cb) {
  var query = this.schema.select('*')
    .from(this.schema)
    .order('clients.name')
    .toQuery();

  utils.findAll(query, cb);
};

function encryptPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

Client.register = function(name, password, cb) {
  var query = this.schema.insert({
    name: name,
    hashed_password: encryptPassword(password)
  }).returning('*').toQuery();

  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

Client.update = function(fields, cb) {
  var id = fields.id;
  var password = fields.password;
  delete fields.id;
  delete fields.password;

  if (password) {
    fields.hashed_password = encryptPassword(password);
  }

  var query = this.schema.update(fields)
    .where(this.schema.id.equals(id))
    .returning('*').toQuery();

  utils.findOne(query, cb);
};

module.exports = Client;
