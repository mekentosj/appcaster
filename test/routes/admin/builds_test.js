var app = require('./../../../app');
var assert = require('assert');
var request = require('supertest');

function makeBuild() {
  return {
    app_id: 1,
    filename: 'papers-123.dmg',
    identifier: 'papers-id',
    version: '3.2.15',
    version_string: '3.2.15 Viking Edition',
    minimum_system_version: 'Mac OS 10.8.3',
    length: 123456,
    download_url: 'https://example.com/papers-123.dmg',
    signature: 'vczxjlvcxkovxzcjljk'
  };
}

describe('build routes', function() {
  it('should allow routes to be listed', function(done) {
    request(app)
      .get('/admin/builds')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for creating builds', function(done) {
    request(app)
      .get('/admin/builds/new')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should show a form for viewing builds', function(done) {
    request(app)
      .get('/admin/builds/1')
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should allow builds to be created', function(done) {
    request(app)
      .post('/admin/builds')
      .send({ build: makeBuild() })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should allow builds to be updated', function(done) {
    request(app)
      .patch('/admin/builds/1')
      .send({ build: { filename: 'test.dmg', notes: 'test notes\rand more' } })
      .set('Cookie', app.get('test:cookies'))
      .expect(200, done)
  });

  it('should require authentication', function(done) {
    request(app)
      .get('/admin/builds/1')
      .expect(401, done)
  });

  it('should allow releases to be added', function(done) {
    request(app)
      .put('/admin/builds/1/releases')
      .send({ releases: { channel_ids: [1] } })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });

  it('should allow releases to be removed', function(done) {
    request(app)
      .put('/admin/builds/1/releases')
      .send({ releases: { channel_ids: [] } })
      .set('Cookie', app.get('test:cookies'))
      .expect(302, done)
  });
});
