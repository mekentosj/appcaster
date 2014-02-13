var app = require('./../../app');
var request = require('supertest');

describe('Authenticated sessions', function() {
  it('should allow specific GitHub members to sign in', function(done) {
    request(app)
      .get('/admin/apps')
      .set('Cookie', app.get('test:cookies'))
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not show admin stuff to anyone else', function(done) {
    request(app)
      .get('/admin/apps')
      .expect(401, done);
  });
});
