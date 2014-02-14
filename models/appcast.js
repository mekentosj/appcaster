var App = require('./app');
var Build = require('./build');
var Channel = require('./channel');

function Appcast() {
}

Appcast.find = function(options, cb) {
  App.findByUrlSlug(options.app_url, function(err, app) {
    if (err) return cb(err);
    if (!app) return cb();

    Channel.findByChannelUrlSlug(options.channel_url, function(err, channel) {
      if (err) return cb(err);
      if (!channel) return cb();

      Build.findAllForChannel(channel, function(err, builds) {
        if (err) return cb(err);
        if (!builds) return cb();

        cb(null, {
          app: app,
          builds: builds,
          channel: channel
        });
      });
    });
  });
};

module.exports = Appcast;
