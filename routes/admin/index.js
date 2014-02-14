module.exports = {
  apps: require('./apps'),
  channels: require('./channels'),

  index: function(req, res, next) {
    res.render('admin/index', { flash: req.flash() });
  },

  session: require('./session')
};
