module.exports = {
  bootstrap: require('./bootstrap'),

  buildNotesUrl: function(urlRoot, appcast, build) {
    var url = '/apps/:url_slug/:channel_url_slug/release-notes/:version.html';
    url = url.replace(/:url_slug/, appcast.app.url_slug);
    url = url.replace(/:channel_url_slug/, appcast.channel.url_slug);
    url = url.replace(/:version/, build.version);

    return urlRoot + url;
  },

  downloadUrl: function(rootUrl, build, channel) {
    var template = rootUrl + '/apps/:url_slug/:channel_url_slug/download/:version/:filename';
    template = template.replace(/:url_slug/, channel.app_url_slug);
    template = template.replace(/:channel_url_slug/, channel.url_slug);
    template = template.replace(/:version/, build.version);
    template = template.replace(/:filename/, build.filename);
    return template;
  },

  formatters: require('./formatters')
};
