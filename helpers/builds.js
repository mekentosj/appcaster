module.exports = {
  optionsLink: function(c) {
    var html = '<a href="/admin/builds/' + c.id + '" class="btn btn-default">Edit</a> ';
    html += '<a href="/admin/builds/' + c.id + '/release" class="btn btn-default">Release</a>';
    return html;
  }
};
