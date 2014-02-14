module.exports = {
  bootstrap: require('./bootstrap'),

  buildNotesUrl: function(urlRoot, appcast, build) {
    var url = '/apps/:url_slug/:channel_url_slug/release-notes/:version.html';
    url = url.replace(/:url_slug/, appcast.app.url_slug);
    url = url.replace(/:channel_url_slug/, appcast.channel.url_slug);
    url = url.replace(/:version/, build.version);

    return urlRoot + url;
  },

  formatters: require('./formatters')
};
