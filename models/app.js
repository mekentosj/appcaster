var sql = require('sql');

var App = sql.define({
  name: 'apps',
  columns: [
    { name: 'id', dataType: 'int', primaryKey: true },
    { name: 'name', dataType: 'varchar(100) NOT NULL' }
  ]
});

module.exports = App;
