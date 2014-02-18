module.exports = {
  create: function(req, res, next) {
  },

  delete: function(req, res, next) {
    req.session = null;
    res.redirect('/');
  },

  error: function(req, res, next) {
    res.flash.error('Sign in error');
    res.status(401);
    res.render('admin/index', { flash: req.flash() });
  }
};
