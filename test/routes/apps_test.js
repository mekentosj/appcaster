var app = require('./../../app');
var assert = require('assert');
var request = require('supertest');

describe('build routes', function() {
  it('should display the Sparkle feeds', function(done) {
    request(app)
      .get('/apps/papers/test-abc/appcast.xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.text.match(/<title>Papers for Mac<\/title>/), 'Expected <title>Papers for Mac</title');
        done();
      });
  });

  it('should skip builds that have hit the download limit', function(done) {
    request(app)
      .get('/apps/papers/test-abc/appcast.xml')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert(!res.text.match(/version="3.2.13"/), '3.2.13 should not be in the feed');
        done();
      });
  });

  it('should render release notes', function(done) {
    request(app)
      .get('/apps/papers/test-abc/release-notes/3.2.14.html')
      .expect(200)
      .end(function(err, res) {
        assert(res.text);
        done();
      });
  });

  it('should redirect to downloads', function(done) {
    request(app)
      .get('/apps/papers/test-abc/download/3.2.14/papers-abc.dmg')
      .expect(302, done);
  });
});
