var app = require('./../../../app');
var assert = require('assert');
var request = require('supertest');

function makeChannel() {
  return {
    app_id: 1,
    url_slug: 'test-123',
    title: 'beta',
    language: 'en',
    platform: 'Mac OS X',
    description: 'Beta releases'
  };
}

describe('channel routes', function() {
  it('should allow routes to be listed', function(done) {
    request(app)
      .get('/admin/channels')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for creating channels', function(done) {
    request(app)
      .get('/admin/channels/new')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for viewing channels', function(done) {
    request(app)
      .get('/admin/channels/1')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should allow channels to be created', function(done) {
    request(app)
      .post('/admin/channels')
      .send({ channel: makeChannel() })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should allow channels to be updated', function(done) {
    request(app)
      .patch('/admin/channels/1')
      .send({ channel: { title: 'test', url_slug: 'test1' } })
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should require authentication', function(done) {
    request(app)
      .get('/admin/channels/1')
      .expect(401, done)
  });
});
