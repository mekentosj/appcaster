module.exports = {
  apps: require('./apps'),

  index: function(req, res, next) {
    res.render('admin/index', { flash: req.flash() });
  },

  session: require('./session')
};
