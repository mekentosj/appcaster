var sql = require('sql');
var utils = require('./utils');

function Release() {
  this.schema = Release.schema;
}

Release.schema = sql.define({
  name: 'releases',
  columns: [
    { name: 'id', dataType: 'serial', primaryKey: true },
    { name: 'build_id', dataType: 'int references builds(id) ON DELETE CASCADE' },
    { name: 'channel_id', dataType: 'int references channels(id) ON DELETE CASCADE' },
    { name: 'created_at', dataType: 'timestamp DEFAULT CURRENT_TIMESTAMP' }
  ]
});

Release.create = function(fields, cb) {
  var query = this.schema.insert(fields).returning('*').toQuery();

  utils.findOne(query, cb);
};

Release.delete = function(fields, cb) {
  var query = this.schema.delete(fields).toQuery();

  utils.findOne(query, cb);
};

Release.findAllForBuildId = function(buildId, cb) {
  var query = this.schema.select('*')
    .from(this.schema)
    .where(this.schema.build_id.equals(buildId))
    .order('releases.created_at DESC')
    .toQuery();

  utils.findAll(query, cb);
};

module.exports = Release;
