var app = require('./../../../app');
var assert = require('assert');
var request = require('supertest');

function makeClient() {
  return {
    name: 'test-123',
    password: 'i123jif'
  };
}

describe('client routes', function() {
  it('should allow routes to be listed', function(done) {
    request(app)
      .get('/admin/clients')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for creating clients', function(done) {
    request(app)
      .get('/admin/clients/new')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for viewing clients', function(done) {
    request(app)
      .get('/admin/clients/1')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should allow clients to be registered', function(done) {
    request(app)
      .post('/admin/clients')
      .send({ client: makeClient() })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should allow clients to be updated', function(done) {
    request(app)
      .patch('/admin/clients/1')
      .send({ client: { name: 'test' } })
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should allow clients to be deleted', function(done) {
    request(app)
      .del('/admin/clients/2')
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should require authentication', function(done) {
    request(app)
      .get('/admin/clients/1')
      .expect(401, done)
  });
});
