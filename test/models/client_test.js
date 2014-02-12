var assert = require('assert');
var Client = require('./../../models').Client;

describe('Client', function() {
  it('should allow clients to be registered', function(done) {
    Client.register('papers', 'f1e77f1a9924d3967857d1910be5c0d6', function(err, result) {
      assert(!err, err);
      assert.equal(result.name, 'papers');
      done();
    });
  });
});
