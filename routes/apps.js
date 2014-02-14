var Appcast = require('./../models').Appcast;

module.exports = {
  create: function(req, res, next) {
  },

  show: function(req, res, next) {
    Appcast.find({
      app_url: req.param('url_slug'),
      channel_url: req.param('channel_url_slug')
    }, function(err, appcast) {
      var release_notes_url = 'TODO';

      if (!appcast) {
        return res.send(200);
      }

      res.set('Content-Type', 'application/xml');

      res.render('appcast', {
        app: appcast.app,
        builds: appcast.builds,
        channel: appcast.channel,
        layout: false,
        release_notes_url: release_notes_url,
        url: res.url
      });
    });
  },

  download: function(req, res, next) {
  },

  releaseNotes: function(req, res, next) {
  }
};
