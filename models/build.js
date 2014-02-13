var App = require('./app');
var db = require('./../db');
var sql = require('sql');

function Build() {
  this.schema = Build.schema;
}

Build.schema = sql.define({
  name: 'builds',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'app_id', dataType: 'int references apps(id)' },
    { name: 'filename', dataType: 'varchar(100)' },
    { name: 'identifier', dataType: 'varchar(100)' },
    { name: 'version', dataType: 'varchar(20)' },
    { name: 'version_string', dataType: 'varchar(100)' },
    { name: 'minimum_system_version', dataType: 'varchar(20)' },
    { name: 'length', dataType: 'bigint' },
    { name: 'download_url', dataType: 'varchar(255)' },
    { name: 'signature', dataType: 'varchar(100)' },
    { name: 'publication_date', dataType: 'timestamp DEFAULT CURRENT_TIMESTAMP' },
    { name: 'notes', dataType: 'text' }
  ]
});

Build.createWithAppUrl = function(urlId, buildFields, cb) {
  App.findByUrlId(urlId, function(err, app) {
    var query;

    if (err) return cb(new Error('No app found'));

    buildFields.app_id = app.id;
    query = this.schema.insert(buildFields).returning('*').toQuery();

    db.query(query.text, query.values, function(err, result) {
      cb(err, result && result.rows ? result.rows[0] : null);
    });
  }.bind(this));
};

module.exports = Build;
