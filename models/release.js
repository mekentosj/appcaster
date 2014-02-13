var sql = require('sql');

function Release() {
  this.schema = Release.schema;
}

Release.schema = sql.define({
  name: 'releases',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'build_id', dataType: 'int references builds(id)' },
    { name: 'channel_id', dataType: 'int references channels(id)' },
    { name: 'created_at', dataType: 'timestamp DEFAULT CURRENT_TIMESTAMP' }
  ]
});

module.exports = Release;
