var app = require('./../app');
var cookies;
var request = require('supertest');

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
