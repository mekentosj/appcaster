var sql = require('sql');

var Release = sql.define({
  name: 'releases',
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
    { name: 'publication_date', dataType: 'timestamp' },
    { name: 'notes', dataType: 'text' }
  ]
});

module.exports = Release;
