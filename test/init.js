var app = require('./../app');
var assert = require('assert');
var prepareDb = require('./lib/preparedb');
var cookies;
var config = require('./../config');
var request = require('supertest');

if (process.env.NODE_ENV !== 'test') {
  throw new Error('Set NODE_ENV to test!');
}

assert.equal(config.database, 'postgres://papers:test@localhost/appcaster-test');

app.get('/__mock_auth', function(req, res, next) {
  req.session.passport = {
    user: {
      name: 'Alex Young',
      username: 'alexyoung'
    }
  };
  res.send(200);
});

before(function(done) {
  prepareDb(function() {
    request(app)
      .get('/__mock_auth')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        cookies = res.headers['set-cookie'];
        app.set('test:cookies', cookies);
        done();
      });
  });
});
