module.exports = {
  apps: require('./apps'),
  builds: require('./builds'),
  channels: require('./channels'),

  index: function(req, res, next) {
    res.render('admin/index', { flash: req.flash() });
  },

  session: require('./session')
};
