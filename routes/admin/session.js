module.exports = {
  create: function(req, res, next) {
  },

  error: function(req, res, next) {
    res.flash.error('Sign in error');
    res.render('admin/index', { flash: req.flash() });
  }
};
