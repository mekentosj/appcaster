var app = require('./../../../app');
var assert = require('assert');
var request = require('supertest');

describe('app routes', function() {
  it('should allow routes to be listed', function(done) {
    request(app)
      .get('/admin/apps')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for creating apps', function(done) {
    request(app)
      .get('/admin/apps/new')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for viewing apps', function(done) {
    request(app)
      .get('/admin/apps/1')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should allow apps to be created', function(done) {
    request(app)
      .post('/admin/apps')
      .send({ app: { name: 'test', url_slug: 'test1' } })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should allow apps to be updated', function(done) {
    request(app)
      .patch('/admin/apps/1')
      .send({ app: { name: 'test', url_slug: 'test1' } })
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should require authentication', function(done) {
    request(app)
      .get('/admin/apps/1')
      .expect(401, done)
  });
});
