var sql = require('sql');

var ReleasedApp = sql.define({
  name: 'released_apps',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'release_id', dataType: 'int references releases(id)' },
    { name: 'channel_id', dataType: 'int references channels(id)' }
  ]
});

module.exports = ReleasedApp;
