var db = require('./../db');
var sql = require('sql');
var utils = require('./utils');

function App() {
  this.schema = App.schema;
}

App.schema = sql.define({
  name: 'apps',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'url_id', dataType: 'varchar(20)', unique: true },
    { name: 'name', dataType: 'varchar(100) NOT NULL' }
  ]
});

App.find = function(id, cb) {
  var query = this.schema.select('*')
    .where(this.schema.id.equals(id))
    .toQuery();

  utils.findOne(query, cb);
};

App.findAll = function(cb) {
  var query = this.schema.select('*').toQuery();
  utils.findAll(query, cb);
};

App.findByUrlId = function(urlId, cb) {
  var query = this.schema.select('*')
    .where(this.schema.url_id.equals(urlId))
    .toQuery();

  utils.findOne(query, cb);
};

App.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  utils.findOne(query, cb);
};

App.update = function(fields, cb) {
  var id = fields.id;
  delete fields.id;
  var query = this.schema.update(fields)
    .where(this.schema.id.equals(id))
    .returning('*').toQuery();

  utils.findOne(query, cb);
};

module.exports = App;
