var db = require('./../db');
var bcrypt = require('bcrypt');
var sql = require('sql');

var Client = sql.define({
  name: 'clients',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'name', dataType: 'varchar(100) NOT NULL' },
    { name: 'hashed_password', dataType: 'varchar(100) NOT NULL' }
  ]
});

Client.register = function(name, password, cb) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  var query = Client.insert({
    name: name,
    hashed_password: hash
  }).returning('*').toQuery();

  db.query(query, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

module.exports = Client;
