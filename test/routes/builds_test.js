var assert = require('assert');
var app = require('./../../app');
var request = require('supertest');

function makeBuildFields() {
  return {
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

describe('build routes', function() {
  var fields = makeBuildFields();

  it('should allow builds to be created', function(done) {
    request(app)
      .post('/apps/papers/builds')
      .auth('gorm', 'password')
      .send(fields)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body.filename, fields.filename);
        done();
      });
  });

  it('should reject incorrect passwords', function(done) {
    request(app)
      .post('/apps/papers/builds')
      .auth('gorm', 'nope')
      .send(makeBuildFields())
      .expect(401, done);
  });

  it('should reject incorrect usernames', function(done) {
    request(app)
      .post('/apps/papers/builds')
      .auth('', 'nope')
      .send(makeBuildFields())
      .expect(401, done);
  });

  it('should reject requests with no credentials', function(done) {
    request(app)
      .post('/apps/papers/builds')
      .send(makeBuildFields())
      .expect(401, done);
  });
});
