var assert = require('assert');
var Build = require('./../../models').Build;

function makeBuildFields() {
  return {
    app_id: 1,
    title: 'Papers for Mac',
    filename: 'papers.dmg',
    identifier: 'id-1234',
    version: '3.1.18',
    version_string: '3.1.18 Lunar Edition',
    minimum_system_version: 'Mac OS X 10.8',
    length: 123456,
    download_url: 'http://aws.example.com/id-1234/papers.dmg',
    signature: '123i91urfewisaf'
  };
}

describe('build model', function() {
  it('should enforce uniqueness on version/app_id', function(done) {
    Build.create(makeBuildFields(), function(err, build) {
      assert(!err);

      Build.create(makeBuildFields(), function(err, build) {
        assert(err);
        done();
      });
    });
  });
});
