var Appcast = require('./../models').Appcast;
var Build = require('./../models').Build;
var errors = require('./../errors');
var marked = require('marked');

module.exports = {
  create: function(req, res, next) {
  },

  show: function(req, res, next) {
    Appcast.find({
      app_url: req.param('url_slug'),
      channel_url: req.param('channel_url_slug')
    }, function(err, appcast) {
      if (!appcast) {
        return res.send(200);
      }

      res.set('Content-Type', 'application/xml');

      res.render('appcast', {
        appcast: appcast,
        app: appcast.app,
        builds: appcast.builds,
        channel: appcast.channel,
        layout: false,
        url: req.url,
        urlRoot: req.protocol + '://' + req.hostname
      });
    });
  },

  download: function(req, res, next) {
    Appcast.findBuildByVersion({
      app_url: req.param('url_slug'),
      channel_url: req.param('channel_url_slug'),
      version: req.param('version')
    }, function(err, appcast) {
      if (err) return next(err);

      if (!appcast) {
        return next(new errors.NotFound('Appcast not found'));
      }

      res.redirect(appcast.build.download_url);
    });
  },

  releaseNotes: function(req, res, next) {
    Appcast.findBuildByVersion({
      app_url: req.param('url_slug'),
      channel_url: req.param('channel_url_slug'),
      version: req.param('version')
    }, function(err, appcast) {
      if (err) return next(err);

      if (!appcast) {
        return next(new errors.NotFound('Appcast not found'));
      }

      res.render('release_notes', {
        build: appcast.build,
        notes: marked(appcast.build.notes),
        layout: false
      });
    });
  }
};
