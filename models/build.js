var App = require('./app');
var db = require('./../db');
var sql = require('sql');
var utils = require('./utils');

function Build() {
  this.schema = Build.schema;
}

Build.schema = sql.define({
  name: 'builds',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'app_id', dataType: 'int references apps(id)' },
    { name: 'filename', dataType: "varchar(100) NOT NULL CHECK (filename <> '')" },
    { name: 'identifier', dataType: "varchar(100) NOT NULL CHECK (identifier <> '')" },
    { name: 'version', dataType: "varchar(20) NOT NULL CHECK (version <> '')" },
    { name: 'version_string', dataType: 'varchar(100)' },
    { name: 'minimum_system_version', dataType: 'varchar(20)' },
    { name: 'length', dataType: 'bigint NOT NULL' },
    { name: 'download_url', dataType: 'varchar(255)' },
    { name: 'signature', dataType: "varchar(100) NOT NULL CHECK (signature <> '')" },
    { name: 'publication_date', dataType: 'timestamp DEFAULT CURRENT_TIMESTAMP' },
    { name: 'notes', dataType: 'text' }
  ]
});

Build.createWithAppUrl = function(urlSlug, buildFields, cb) {
  App.findByUrlSlug(urlSlug, function(err, app) {
    var query;

    if (err) return cb(new Error('No app found'));

    buildFields.app_id = app.id;
    query = this.schema.insert(buildFields).returning('*').toQuery();

    db.query(query.text, query.values, function(err, result) {
      cb(err, result && result.rows ? result.rows[0] : null);
    });
  }.bind(this));
};

Build.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  utils.findOne(query, cb);
};

Build.find = function(id, cb) {
  var app = App.schema;
  var query = this.schema.select('builds.*, apps.name AS app_name')
    .from(this.schema.join(app).on(this.schema.app_id.equals(app.id)))
    .where(this.schema.id.equals(id))
    .toQuery();

  utils.findOne(query, cb);
};

Build.findAll = function(cb) {
  var app = App.schema;
  var query = this.schema.select('builds.*, apps.name AS app_name')
    .from(this.schema.join(app).on(this.schema.app_id.equals(app.id)))
    .order('builds.publication_date DESC')
    .toQuery();

  utils.findAll(query, cb);
};

Build.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  utils.findOne(query, cb);
};

Build.update = function(fields, cb) {
  var id = fields.id;
  delete fields.id;
  var query = this.schema.update(fields)
    .where(this.schema.id.equals(id))
    .returning('*').toQuery();

  utils.findOne(query, cb);
};

module.exports = Build;
