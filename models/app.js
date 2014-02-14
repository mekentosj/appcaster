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
    { name: 'url_slug', dataType: "varchar(20) NOT NULL CHECK (url_slug <> '')", unique: true },
    { name: 'name', dataType: "varchar(100) NOT NULL CHECK (name <> '')" }
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

App.findByUrlSlug = function(urlSlug, cb) {
  var query = this.schema.select('*')
    .where(this.schema.url_slug.equals(urlSlug))
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
