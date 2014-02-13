var sql = require('sql');

function Channel() {
  this.schema = Channel.schema;
}

Channel.schema = sql.define({
  name: 'channels',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'url_slug', dataType: 'varchar(30) NOT NULL' },
    { name: 'title', dataType: 'varchar(200) NOT NULL' },
    { name: 'language', dataType: 'varchar(10) NOT NULL' },
    { name: 'platform', dataType: 'varchar(20) NOT NULL' },
    { name: 'description', dataType: 'text NOT NULL' }
  ]
});

module.exports = Channel;
