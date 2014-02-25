var assert = require('assert');
var app = require('./../../app');
var request = require('supertest');

var lastVersion = 16;

function makeBuildFields() {
  lastVersion++;

  return {
    app_id: 1,
    title: 'Papers for X',
    filename: 'papers.dmg',
    identifier: 'id-1234',
    version: '3.1.' + lastVersion,
    version_string: '3.1.' + lastVersion + ' Lunar Edition',
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
