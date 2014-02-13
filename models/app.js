var db = require('./../db');
var sql = require('sql');

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

App.findByUrlId = function(urlId, cb) {
  var query = this.schema.select('*')
    .where(this.schema.url_id.equals(urlId))
    .toQuery();

  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

App.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  db.query(query.text, query.values, function(err, result) {
    cb(err, result && result.rows ? result.rows[0] : null);
  });
};

module.exports = App;
