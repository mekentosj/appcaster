module.exports = {
  optionsLink: function(c) {
    var html = '<a href="/admin/builds/' + c.id + '/edit" class="btn btn-default">Edit</a> ';
    html += '<a href="/admin/builds/' + c.id + '" class="btn btn-default">View</a> ';
    html += '<a href="/admin/builds/' + c.id + '/release" class="btn btn-default">Release</a>';
    return html;
  },

  releaseNotesUrl: function(rootUrl, build, channel) {
    var template = rootUrl + '/apps/:url_slug/:channel_url_slug/release-notes/:version\.html';
    template = template.replace(/:url_slug/, channel.app_url_slug);
    template = template.replace(/:channel_url_slug/, channel.url_slug);
    template = template.replace(/:version/, build.version);
    return template;
  },

  downloadLink: function(build) {
    return '<a href="' + build.download_url + '">' + build.fileName + '</a>';
  }
};
