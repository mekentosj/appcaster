var sql = require('sql');

var Channel = sql.define({
  name: 'channels',
  columns: [
    { name: 'id', dataType: 'int', primaryKey: true },
    { name: 'url_slug', dataType: 'varchar(30) NOT NULL' },
    { name: 'title', dataType: 'varchar(200) NOT NULL' },
    { name: 'language', dataType: 'varchar(10) NOT NULL' },
    { name: 'platform', dataType: 'varchar(20) NOT NULL' },
    { name: 'description', dataType: 'text NOT NULL' }
  ]
});

module.exports = Channel;
